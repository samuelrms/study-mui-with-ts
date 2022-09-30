import { Route } from "react-router-dom";
import { routes } from "./routes";

export const routeConstructor = routes.map((route) => {
  return <Route key={route.path} path={route.path} element={route.element} />;
});
