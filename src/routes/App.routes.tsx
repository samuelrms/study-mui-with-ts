import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "./../shared/contexts";
import { routeConstructor } from "./routeConstructor";
import { routes } from "./routes";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions(routes);
  }, []);

  return (
    <Routes>
      {routeConstructor}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
