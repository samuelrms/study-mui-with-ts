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
  className: string;
  onClick: (() => void) | undefined;
}

export const ListItemLink: React.FC<ListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
  className,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);

  /**
   * utilizado para comparar as rotas, para utilizar subRotas passar o end como false
   */
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton
      className={className}
      sx={{
        "&.newPeople": {
          ml: 2,
          borderRadius: "0 0 0 8px",
        },
        " &.detailsPeople": {
          display: "none",
        },
      }}
      selected={!!match}
      onClick={handleClick}
    >
      <ListItemIcon>
        <Icon color="primary">{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
