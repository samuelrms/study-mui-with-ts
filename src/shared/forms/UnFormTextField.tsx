import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useField } from "@unform/core";
import { UnFormTextFieldProps } from "./InterfaceAndType";

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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        error ? clearError() : undefined;
        props.onKeyDown?.(e);
      }}
    />
  );
};
