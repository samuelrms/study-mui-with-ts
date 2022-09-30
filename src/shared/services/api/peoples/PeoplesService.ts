import { Environment } from "../../../environment";
import { API } from "../axiosConfig";

interface DetailPeople {
  id: number;
  cityID: number;
  fullName: string;
  email: string;
}

interface PeopleList {
  id: number;
  cityID: number;
  fullName: string;
  email: string;
}

type PeopleCount = {
  data: PeopleList[];
  totalCount: number;
};

const { LIMITS_OF_LINES } = Environment;

const getAll = async (page = 1, filter = ""): Promise<PeopleCount | Error> => {
  try {
    const urlRelative = `people?_page=${page}&_limit=${LIMITS_OF_LINES}&fullName_like=${filter}`;

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

const getByID = async (id: number): Promise<DetailPeople | Error> => {
  try {
    const { data } = await API.get(`people/${id}`);

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
  dataPeople: Omit<DetailPeople, "id">,
): Promise<number | Error> => {
  try {
    const { data } = await API.post<DetailPeople>("people", dataPeople);

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
  dataPeople: Omit<DetailPeople, "id">,
): Promise<void | Error> => {
  try {
    const { data } = await API.put(`people/${id}`, dataPeople);

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
    const { data } = await API.delete(`people/${id}`);

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

export const PessoasService = {
  create,
  getAll,
  getByID,
  updateByID,
  deleteByID,
};
