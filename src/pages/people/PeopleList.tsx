import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import { ListPeople, PeopleService } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { Toolbar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { listData } from "../../shared/mocks";

export const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<ListPeople[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  useEffect(() => {
    setLoading(true);
    debounce(() => {
      PeopleService.getAll(1, search)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            return;
          } else {
            console.log(result);

            setRows(result.data);
            setTotalCount(result.totalCount);
            setLoading(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
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
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {listData.tableHead.map((data, index) => {
                return <TableCell key={index}>{data}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>{data.action}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.age}</TableCell>
                  <TableCell>{data.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
