import React, { useEffect, useState } from "react";
import { LinearProgress, Box, Paper, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services";
import { UnFormTextField, UnForm, useUnForm } from "../../shared/forms";
import { listItensForm } from "./utils";

export interface FormData {
  name: string;
  fullName: string;
  email: string;
  age: number;
  cityID: number;
}

export const PeopleDetails: React.FC = () => {
  const { formRef, isSaveAndBack, save, saveAndBack } = useUnForm();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { deleteByID, getByID, create, updateByID } = PeopleService;

  const handleSave = (data: FormData) => {
    setLoading(true);
    if (id === "nova") {
      create(data)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndBack()) {
              navigate("/pessoas");
            } else {
              navigate(`/pessoas/detalhes/${result}`);
            }
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
          } else {
            if (isSaveAndBack()) {
              navigate("/pessoas");
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
    } else {
      formRef.current?.setData({
        name: "",
        fullName: "",
        email: "",
        age: "",
        cityID: "",
      });
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
            saveAndBack: true,
          }}
          handleClick={{
            new: onNew,
            back: onBack,
            delete: onDelete,
            save,
            saveAndBack,
          }}
        />
      }
    >
      <UnForm ref={formRef} onSubmit={handleSave}>
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
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </UnForm>
    </LayoutBasePage>
  );
};
