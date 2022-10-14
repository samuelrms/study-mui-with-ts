import React, { createContext, useCallback, useContext, useMemo } from "react";
import { usePersistedState } from "../hooks";
import { Children } from "../Interfaces";
import { AuthService } from "../services/api/auth/AuthService";

interface AuthContextData {
  authenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<Children> = ({ children }) => {
  const [accessToken, setAccessToken] = usePersistedState<string | undefined>(
    "@Access_Token",
    undefined,
  );

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      setAccessToken(result.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = useCallback(() => {
    setAccessToken(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ login: handleLogin, authenticated, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
