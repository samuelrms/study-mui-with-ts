import { createTheme } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#fff",
    },
    secondary: {
      main: grey[400],
      dark: grey[300],
      light: grey[300],
      contrastText: "#fff",
    },
    background: {
      paper: "#303134",
      default: "#202124",
    },
  },
});
