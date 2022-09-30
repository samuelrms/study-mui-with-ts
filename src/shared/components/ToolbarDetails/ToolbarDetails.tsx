/* eslint-disable indent */
import React from "react";
import {
  Box,
  Button,
  Paper,
  useTheme,
  Icon,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
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
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

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
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {load?.save && <Skeleton width={110} height={60} />}

      {!mdDown && !smDown && showButton?.saveAndBack && !load?.saveAndBack && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>save</Icon>}
          disableElevation
          onClick={handleClick?.saveAndBack}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {!mdDown && !smDown && load?.saveAndBack && (
        <Skeleton width={180} height={60} />
      )}

      {!showButton?.delete && !load?.delete && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>delete</Icon>}
          disableElevation
          onClick={handleClick?.delete}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {load?.delete && <Skeleton width={110} height={60} />}

      {!showButton?.new && !load?.new && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>add</Icon>}
          disableElevation
          onClick={handleClick?.new}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textButtonNew}
          </Typography>
        </Button>
      )}
      {load?.new && !smDown && <Skeleton width={110} height={60} />}

      {!showButton?.back &&
        (!showButton?.new ||
          !showButton?.delete ||
          !showButton?.save ||
          showButton?.saveAndBack) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {!showButton?.back && !load?.back && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>arrow_back</Icon>}
          disableElevation
          onClick={handleClick?.back}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {load?.back && <Skeleton width={110} height={60} />}
    </Box>
  );
};
