import { Toolbar, ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBasePage
      title="Página inicial"
      toolbar={<ToolbarDetails showButton={{ saveAndBack: true }} />}
    >
      Dashboard
    </LayoutBasePage>
  );
};
