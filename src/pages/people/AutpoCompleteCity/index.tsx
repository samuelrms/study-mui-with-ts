import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services";

type AutoCompleteCityOptions = {
  label: string;
  id: number;
};

interface AutoCompleteCityProps {
  externalLoading: boolean;
}

export const AutoCompleteCity: React.FC<AutoCompleteCityProps> = ({
  externalLoading = false,
}) => {
  const [selectedID, setSelectedID] = useState<number | undefined>(undefined);
  const [options, setOptions] = useState<AutoCompleteCityOptions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { debounce } = useDebounce();

  useEffect(() => {
    setLoading(true);
    debounce(() => {
      CitiesService.getAll(1, search)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result.data);
            setOptions(
              result.data.map((city) => ({ id: city.id, label: city.name })),
            );
            setLoading(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [search]);

  const autoCompleteOption = useMemo(() => {
    if (!selectedID) return undefined;

    const selectedOptions = options.find((option) => option.id === selectedID);

    return selectedOptions;
  }, [selectedID, options]);

  // aula #41 52:00

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Nenhuma opção encontrada"
      loadingText="Carregando..."
      disablePortal
      value={autoCompleteOption}
      loading={loading}
      disabled={externalLoading}
      popupIcon={
        loading || externalLoading ? <CircularProgress size={24} /> : undefined
      }
      options={options}
      onChange={(_, newValue) => {
        setSelectedID(newValue?.id);
        setSearch("");
      }}
      onInputChange={(_, newValue) => setSearch(newValue)}
      renderInput={(params) => <TextField {...params} label={"Cidade"} />}
    />
  );
};
