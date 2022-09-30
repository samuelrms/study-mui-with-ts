import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface ListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

export const ListItemLink: React.FC<ListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);

  /**
   * utilizado para comparar as rotas, para utilizar subRotas passar o end como false
   */
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon color="primary">{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
