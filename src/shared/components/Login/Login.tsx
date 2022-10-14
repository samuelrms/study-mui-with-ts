import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";

import { useAuthContext } from "../../contexts";
import { Children } from "../../Interfaces";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const Login: React.FC<Children> = ({ children }) => {
  const { authenticated, login } = useAuthContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((validateData) => {
        setLoading(true);
        login(validateData.email, validateData.password).then(() => {
          setLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (authenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              Identifique-se
            </Typography>
            <TextField
              value={email}
              fullWidth
              label="E-mail"
              type="email"
              disabled={loading}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError("")}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              label="Senha"
              type="password"
              disabled={loading}
              error={!!passwordError}
              helperText={
                !passwordError
                  ? `Quantidade de caracteres ${password?.length ?? 0}/6`
                  : passwordError
              }
              onKeyDown={() => setPasswordError("")}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
          >
            <Button
              fullWidth
              disabled={loading}
              variant="contained"
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress variant="indeterminate" size={20} />
              ) : (
                "Entrar"
              )}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
