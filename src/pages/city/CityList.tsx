/* eslint-disable indent */
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

import { ListCities, CitiesService } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { Toolbar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { listDataCity } from "../../shared/mocks";
import { Environment } from "../../shared/environment";

export const CityList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<ListCities[]>([]);
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
    CitiesService.deleteByID(id).then((result) => {
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
      CitiesService.getAll(page, search)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
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
  }, [search, page]);

  return (
    <LayoutBasePage
      title="Listagem de Cidades"
      toolbar={
        <Toolbar
          textButtonNew="Nova"
          showSearchInput
          searchText={search}
          onClick={() => navigate("/cidades/detalhe/nova")}
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
              {listDataCity.tableHead.map((data, index) => {
                return (
                  <TableCell
                    key={index}
                    width={
                      data === "ID" ? 100 : data === "Ações" ? 100 : "auto"
                    }
                  >
                    {data}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell
                    onClick={() => navigate(`/cidades/detalhes/${data.id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    {data.name}
                  </TableCell>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(data.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/cidades/detalhes/${data.id}`)}
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
                <TableCell colSpan={listDataCity.tableHead.length}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > LIMITS_OF_LINES && (
              <TableRow>
                <TableCell colSpan={3}>
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
