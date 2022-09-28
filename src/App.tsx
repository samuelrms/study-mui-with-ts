import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/App.routes";
import { LateralMenu } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <LateralMenu>
          <AppRoutes />
        </LateralMenu>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
