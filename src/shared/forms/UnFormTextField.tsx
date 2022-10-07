import { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";

type UnFormTextFieldProps = TextFieldProps & {
  name: string;
};

export const UnFormTextField: React.FC<UnFormTextFieldProps> = ({
  name,
  ...props
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...props}
      value={value}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error ? clearError() : undefined;
        props.onKeyDown?.(e);
      }}
    />
  );
};
