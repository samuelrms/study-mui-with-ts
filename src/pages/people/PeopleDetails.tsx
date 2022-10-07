import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress, Box, Paper, Grid, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services";
import { UnFormTextField } from "../../shared/forms";
import { listItensForm } from "./utils";

interface FormData {
  name: string;
  fullName: string;
  email: string;
  age: number;
  cityID: number;
}

export const PeopleDetails: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const formRef = useRef<FormHandles>(null);

  const navigate = useNavigate();

  const { deleteByID, getByID, create, updateByID } = PeopleService;

  const onSave = () => {
    formRef.current?.submitForm();
  };

  const handleSave = (data: FormData) => {
    setLoading(true);
    if (id === "nova") {
      create(data)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhes/${result}`);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      updateByID(Number(id), data)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSaveBack = () => {
    formRef.current?.submitForm();
  };

  const onDelete = () => {
    if (confirm("Deseja apagar o registro?")) {
      deleteByID(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate("/pessoas");
        }
      });
    }
  };

  const onBack = () => {
    navigate("/pessoas");
  };

  const onNew = () => {
    navigate("/pessoas/detalhe/nova");
  };

  useEffect(() => {
    if (id !== "nova") {
      setLoading(true);
      getByID(Number(id))
        .then((data) => {
          if (data instanceof Error) {
            alert(data.message);
            navigate("/pessoas");
          } else {
            setName(data.fullName);
            formRef.current?.setData(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <LayoutBasePage
      title={id !== "nova" ? name : "Nova pessoa"}
      toolbar={
        <ToolbarDetails
          textButtonNew="Nova"
          showButton={{
            new: id === "nova",
            delete: id === "nova",
            back: false,
            save: false,
            saveAndBack: false,
          }}
          handleClick={{
            new: onNew,
            back: onBack,
            delete: onDelete,
            save: onSave,
            saveAndBack: onSaveBack,
          }}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {loading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            {listItensForm.map(({ label, name }, index) => {
              return (
                <Grid key={index} container item direction="row" spacing={2}>
                  <Grid item xs={12} md={6} lg={4} xl={2}>
                    <UnFormTextField
                      fullWidth
                      label={label}
                      name={name}
                      disabled={loading}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Form>
    </LayoutBasePage>
  );
};
