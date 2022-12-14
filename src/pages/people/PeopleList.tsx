import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Paper,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
} from "@mui/material";

import { ListPeople, PeopleService } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { Toolbar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { listDataPeople } from "../../shared/mocks";
import { Environment } from "../../shared/environment";

export const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<ListPeople[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  const page = useMemo(
    () => Number(searchParams.get("page") || "1"),
    [searchParams],
  );

  const { EMPTY_LISTING, LIMITS_OF_LINES } = Environment;

  const handleDelete = (id: number) => {
    PeopleService.deleteByID(id).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    debounce(() => {
      PeopleService.getAll(page, search)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result.data);
            setTotalCount(result.totalCount);
            setLoading(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [search, page, debounce]);

  return (
    <LayoutBasePage
      title="Listagem de Pessoas"
      toolbar={
        <Toolbar
          textButtonNew="Nova"
          showSearchInput
          searchText={search}
          onClick={() => navigate("/pessoas/detalhe/nova")}
          toggleTextSearch={(text) =>
            setSearchParams({ search: text, page: "1" }, { replace: true })
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
              {listDataPeople.tableHead.map((data, index) => {
                return <TableCell key={index}>{data}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell
                    onClick={() => navigate(`/pessoas/detalhes/${data.id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    {data.fullName}
                  </TableCell>
                  <TableCell>{data.age}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(data.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/pessoas/detalhes/${data.id}`)}
                      size="small"
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {totalCount === 0 && !loading && <caption>{EMPTY_LISTING}</caption>}
          <TableFooter>
            {loading && (
              <TableRow>
                <TableCell colSpan={listDataPeople.tableHead.length}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > LIMITS_OF_LINES && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / LIMITS_OF_LINES)}
                    onChange={(_, newPage) =>
                      setSearchParams({ search, page: newPage.toString() })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
