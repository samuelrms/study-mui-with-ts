import { createTheme } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: grey[700],
      dark: grey[800],
      light: grey[300],
      contrastText: "#fff",
    },
    secondary: {
      main: yellow[700],
      dark: yellow[400],
      light: yellow[500],
      contrastText: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#f7f6f3",
    },
  },
});
