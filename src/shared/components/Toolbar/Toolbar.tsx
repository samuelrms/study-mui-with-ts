import React from "react";
import { Box, TextField, Button, Paper, useTheme } from "@mui/material";

export const Toolbar: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      paddingX={2}
      padding={1}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      <TextField />
      <Button>Novo</Button>
    </Box>
  );
};
