import { createTheme } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey[500],
      dark: grey[600],
      light: grey[300],
      contrastText: "#000",
    },
    secondary: {
      main: yellow[700],
      dark: yellow[400],
      light: yellow[500],
      contrastText: "#000",
    },
    background: {
      paper: "#fff",
      default: "#f7f6f3",
    },
  },
  typography: {
    allVariants: {
      color: "#000",
    },
  },
});
