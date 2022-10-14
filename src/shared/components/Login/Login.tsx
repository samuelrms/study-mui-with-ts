import { Box } from "@mui/material";
import React from "react";
import { useAuthContext } from "../../contexts";
import { Children } from "../../Interfaces";

export const Login: React.FC<Children> = ({ children }) => {
  const { authenticated } = useAuthContext();

  if (authenticated) return <>{children}</>;

  return <Box>Login</Box>;
};
