import {
  Avatar,
  Divider,
  Drawer,
  List,
  useTheme,
  useMediaQuery,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  Box,
} from "@mui/material";

import { Children } from "../../Interfaces";
import avatar from "../../assets/avatar.jpeg";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { ListItemLink } from "./ListItemLink";

export const LateralMenu: React.FC<Children> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();

  return (
    <>
      <Drawer
        onClose={toggleDrawerOpen}
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
      >
        <Box
          width={theme.spacing(28)}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Image avatar"
              src={avatar}
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  className={drawerOption.className}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon color="primary">light</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={themeName === "light" ? "Tema escuro" : "Tema claro"}
                />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
