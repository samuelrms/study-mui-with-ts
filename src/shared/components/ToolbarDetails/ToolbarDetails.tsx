import React from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  useTheme,
  Icon,
  Divider,
} from "@mui/material";

interface ToolbarDetailsProps {
  textButtonNew?: string;
  showButton?: {
    new?: boolean;
    back?: boolean;
    delete?: boolean;
    save?: boolean;
    saveAndBack?: boolean;
  };
  handleClick?: {
    new?: () => void;
    back?: () => void;
    delete?: () => void;
    save?: () => void;
    saveAndBack?: () => void;
  };
}

export const ToolbarDetails: React.FC<ToolbarDetailsProps> = ({
  textButtonNew = "Novo",
  showButton,
  handleClick,
}) => {
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
      {!showButton?.save && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon>save</Icon>}
          disableElevation
          onClick={handleClick?.save}
        >
          Salvar
        </Button>
      )}
      {showButton?.saveAndBack && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>save</Icon>}
          disableElevation
          onClick={handleClick?.saveAndBack}
        >
          Salvar e voltar
        </Button>
      )}
      {!showButton?.delete && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>delete</Icon>}
          disableElevation
          onClick={handleClick?.delete}
        >
          Apagar
        </Button>
      )}
      {!showButton?.new && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>add</Icon>}
          disableElevation
          onClick={handleClick?.new}
        >
          {textButtonNew}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />
      {!showButton?.back && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>arrow_back</Icon>}
          disableElevation
          onClick={handleClick?.back}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
