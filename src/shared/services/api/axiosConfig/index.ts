import axios from "axios";
import { URL_BASE } from "../../../constants";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const API = axios.create({
  baseURL: URL_BASE,
});

API.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { API };
