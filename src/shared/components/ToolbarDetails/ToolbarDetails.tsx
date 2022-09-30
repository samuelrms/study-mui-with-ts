import React from "react";
import {
  Box,
  Button,
  Paper,
  useTheme,
  Icon,
  Divider,
  Skeleton,
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
  load?: {
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
  load,
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
      {!showButton?.save && !load?.save && (
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
      {load?.save && <Skeleton width={110} height={60} />}

      {showButton?.saveAndBack && !load?.saveAndBack && (
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
      {load?.saveAndBack && <Skeleton width={180} height={60} />}

      {!showButton?.delete && !load?.delete && (
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
      {load?.delete && <Skeleton width={110} height={60} />}

      {!showButton?.new && !load?.new && (
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
      {load?.new && <Skeleton width={110} height={60} />}

      <Divider variant="middle" orientation="vertical" />
      {!showButton?.back && !load?.back && (
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
      {load?.back && <Skeleton width={110} height={60} />}
    </Box>
  );
};
