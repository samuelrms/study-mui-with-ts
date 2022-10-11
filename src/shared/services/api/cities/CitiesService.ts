import { Environment } from "../../../environment";
import { API } from "../axiosConfig";

export interface DetailCities {
  id: number;
  name: string;
}

export interface ListCities {
  name: string;
  id: number;
}

type PeopleCount = {
  data: ListCities[];
  totalCount: number;
};

const { LIMITS_OF_LINES } = Environment;

const getAll = async (
  page = 1,
  filter = "search",
): Promise<PeopleCount | Error> => {
  try {
    const urlRelative = `city?_page=${page}&_limit=${LIMITS_OF_LINES}&name_like=${filter}`;

    const { data, headers } = await API.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || LIMITS_OF_LINES),
      };
    }
    return new Error("Erro ao listar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { massage: string }).massage || "Erro ao listar os registros",
    );
  }
};

const getByID = async (id: number): Promise<DetailCities | Error> => {
  try {
    const { data } = await API.get(`city/${id}`);

    if (data) {
      return data;
    }
    return new Error("Erro ao consultar o registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { massage: string }).massage || "Erro ao consultar o registro",
    );
  }
};

const create = async (
  dataPeople: Omit<DetailCities, "id">,
): Promise<number | Error> => {
  try {
    const { data } = await API.post<DetailCities>("city", dataPeople);

    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar o registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { massage: string }).massage || "Erro ao criar o registro",
    );
  }
};

const updateByID = async (
  id: number,
  dataPeople: Omit<DetailCities, "id">,
): Promise<void | Error> => {
  try {
    const { data } = await API.put(`city/${id}`, dataPeople);

    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { massage: string }).massage || "Erro ao atualizar o registro",
    );
  }
};

const deleteByID = async (id: number): Promise<void | Error> => {
  try {
    const { data } = await API.delete(`city/${id}`);

    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { massage: string }).massage || "Erro ao apagar o registro",
    );
  }
};

export const CitiesService = {
  create,
  getAll,
  getByID,
  updateByID,
  deleteByID,
};
