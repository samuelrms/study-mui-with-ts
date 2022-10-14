import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TranslationsYup";
import { AppRoutes } from "./routes/App.routes";
import { LateralMenu, Login } from "./shared/components";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
} from "./shared/contexts";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <LateralMenu>
                <AppRoutes />
              </LateralMenu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
