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

export const ToolbarDetails: React.FC = () => {
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon>save</Icon>}
        disableElevation
        // onClick={"onClick"}
      >
        {"save"}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>save</Icon>}
        disableElevation
        // onClick={"onClick"}
      >
        {"save and back"}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>delete</Icon>}
        disableElevation
        // onClick={"onClick"}
      >
        {"delete"}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>add</Icon>}
        disableElevation
        // onClick={"onClick"}
      >
        {"new"}
      </Button>
      <Divider variant="middle" orientation="vertical" />
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>arrow_back</Icon>}
        disableElevation
        // onClick={"onClick"}
      >
        {"back"}
      </Button>
    </Box>
  );
};
