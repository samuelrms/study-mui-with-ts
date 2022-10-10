import * as yup from "yup";
import { FormData } from "../PeopleDetails";

export const formValidationSchema: yup.SchemaOf<FormData> = yup.object().shape({
  fullName: yup.string().required().min(3),
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityID: yup.number().required(),
  age: yup.number().required().positive().integer().max(100).min(16),
});
