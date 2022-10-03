import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Toolbar } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services";

export const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  useEffect(() => {
    PeopleService.getAll(1, search).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      console.log(result);
    });
  }, [search]);

  return (
    <LayoutBasePage
      title="Listagem de Pessoas"
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
