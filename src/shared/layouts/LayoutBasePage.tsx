import React from "react";
import {
  IconButton,
  Typography,
  useTheme,
  Icon,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts";

interface LayoutBasePageProps {
  children: React.ReactNode;
  title: string;
}

export const LayoutBasePage: React.FC<LayoutBasePageProps> = ({
  children,
  title,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        gap={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box>Ferramentas</Box>
      <Box>{children}</Box>
    </Box>
  );
};
