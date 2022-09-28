import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "./../shared/contexts";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen } = useDrawerContext();


  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Box>
            <Button variant="contained" color="primary" onClick={toggleTheme}>
              Toggle theme
            </Button>
            <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
              Open Drawer
            </Button>
          </Box>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
