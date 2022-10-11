import * as yup from "yup";
import { FormDataCity } from "../CityDetails";

export const formValidationSchema: yup.SchemaOf<FormDataCity> = yup
  .object()
  .shape({
    name: yup.string().required().min(3),
  });
