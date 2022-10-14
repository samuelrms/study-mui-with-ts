import { CitiesService, PeopleService } from "../../../shared/services";

export const useFunctionGetAllPeoplesAndCities = (
  setLoadingCity: React.Dispatch<React.SetStateAction<boolean>>,
  setLoadingPeople: React.Dispatch<React.SetStateAction<boolean>>,
  setTotalCountCity: React.Dispatch<React.SetStateAction<number | undefined>>,
  setTotalCountPeople: React.Dispatch<React.SetStateAction<number | undefined>>,
) => {
  const getCity = () => {
    setLoadingCity(true);
    CitiesService.getAll(1, "")
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCity(result.totalCount);
          setLoadingCity(false);
        }
      })
      .finally(() => {
        setLoadingCity(false);
      });
  };

  const getPeople = () => {
    setLoadingPeople(true);
    PeopleService.getAll(1, "")
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCountPeople(result.totalCount);
          setLoadingPeople(false);
        }
      })
      .finally(() => {
        setLoadingPeople(false);
      });
  };

  return { getCity, getPeople };
};
