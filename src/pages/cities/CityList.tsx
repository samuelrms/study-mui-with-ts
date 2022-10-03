import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Toolbar } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const CityList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  return (
    <LayoutBasePage
      title="Listagem de cidades"
      toolbar={
        <Toolbar
          textButtonNew="Nova"
          showSearchInput
          searchText={search}
          toggleTextSearch={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    >
      {""}
    </LayoutBasePage>
  );
};
