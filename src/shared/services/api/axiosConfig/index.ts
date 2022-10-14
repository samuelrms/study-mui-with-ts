import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

const { URL_BASE } = Environment;

const API = axios.create({
  baseURL: URL_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("@Access_Token")}`,
  },
});

API.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { API };
