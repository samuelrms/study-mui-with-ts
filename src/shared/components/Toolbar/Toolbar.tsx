import { Box, TextField, Button, Paper, useTheme, Icon } from "@mui/material";

import { Environment } from "../../environment";

interface ToolbarProps {
  searchText?: string;
  showSearchInput?: boolean;
  toggleTextSearch?: (newText: string) => void;
  textButtonNew?: string;
  openButtonNew?: boolean;
  onClick?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchText = "",
  showSearchInput: openSearchInput = false,
  openButtonNew = true,
  textButtonNew = "Novo",
  toggleTextSearch,
  onClick,
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
      {openSearchInput && (
        <TextField
          value={searchText}
          onChange={(e) => toggleTextSearch?.(e.target.value)}
          size="small"
          placeholder={Environment.INPUT_SEARCH}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {openButtonNew && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>add</Icon>}
            disableElevation
            onClick={onClick}
          >
            {textButtonNew}
          </Button>
        )}
      </Box>
    </Box>
  );
};
