import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { useFunctionGetAllPeoplesAndCities } from "./functions";

export const Dashboard = () => {
  const [loadingCity, setLoadingCity] = useState<boolean>(false);
  const [totalCountCity, setTotalCountCity] = useState<number | undefined>(
    undefined,
  );
  const [loadingPeople, setLoadingPeople] = useState<boolean>(false);
  const [totalCountPeople, setTotalCountPeople] = useState<number | undefined>(
    undefined,
  );

  const navigate = useNavigate();

  const { getCity, getPeople } = useFunctionGetAllPeoplesAndCities(
    setLoadingCity,
    setLoadingPeople,
    setTotalCountCity,
    setTotalCountPeople,
  );

  useEffect(() => {
    getCity();
    getPeople();
  }, [getCity, getPeople]);

  return (
    <LayoutBasePage
      title="Página inicial"
      toolbar={
        <ToolbarDetails
          showButton={{ new: true, save: true, delete: true, back: true }}
        />
      }
    >
      <Box width={"100%"} display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    {loadingPeople ? (
                      <Typography variant="h1" padding={6}>
                        <CircularProgress />
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ cursor: "pointer" }}
                        variant="h1"
                        padding={6}
                        onClick={() => navigate("/pessoas")}
                      >
                        {totalCountPeople}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    {loadingCity ? (
                      <Typography variant="h1" padding={6}>
                        <CircularProgress />
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ cursor: "pointer" }}
                        variant="h1"
                        padding={6}
                        onClick={() => navigate("/cidades")}
                      >
                        {totalCountCity}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
