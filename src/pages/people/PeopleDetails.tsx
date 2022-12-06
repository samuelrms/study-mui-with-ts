import React, { useEffect, useState } from "react";
import { LinearProgress, Box, Paper, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Form } from "@unform/web";

import { UnFormTextField, useUnForm } from "../../shared/forms";
import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { useFunctionButtonsToolbar } from "./function";
import { listItensForm } from "./utils";
import { AutoCompleteCity } from "./AutpoCompleteCity";

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

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { handleSave, onDelete, onBack, onNew, getPeople } =
    useFunctionButtonsToolbar(id, setLoading, setName, formRef, isSaveAndBack);

  useEffect(() => {
    getPeople();
  }, [id, getPeople]);

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
              <Typography variant="h6">Nova pessoa</Typography>
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
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <AutoCompleteCity externalLoading={loading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBasePage>
  );
};
