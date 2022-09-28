import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/App.routes";
import { AppThemeProvider } from "./shared/contexts";
import { DarkTheme, LightTheme } from "./shared/themes";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
};
