import { TextFieldProps } from "@mui/material";

export interface UnFormErrorsProps {
  [key: string]: string;
}

export type UnFormTextFieldProps = TextFieldProps & {
  name: string;
};
