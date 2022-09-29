import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { ThemeProvider, Box } from "@mui/material";
import { DarkTheme, LightTheme } from "../themes";
import { Children } from "../Interfaces";

interface ThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<Children> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light",
    );
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") {
      return LightTheme;
    }
    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
