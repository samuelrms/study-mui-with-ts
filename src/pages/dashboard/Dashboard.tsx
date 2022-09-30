import { Toolbar } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBasePage
      title="Página inicial"
      toolbar={<Toolbar openSearchInput />}
    >
      Dashboard
    </LayoutBasePage>
  );
};
