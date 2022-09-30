import React from "react";
import { Toolbar } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const CityList: React.FC = () => {
  return (
    <LayoutBasePage
      title="Listagem de cidades"
      toolbar={<Toolbar textButtonNew="Nova" showSearchInput />}
      // #24 // time: 16:40
    >
      {""}
    </LayoutBasePage>
  );
};
