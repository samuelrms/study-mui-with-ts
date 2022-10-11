import { useNavigate } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as yup from "yup";

import { CitiesService } from "../../../../shared/services";
import { FormDataCity } from "../../CityDetails";
import { formValidationSchema } from "../validation/formValidation";
import { UnFormErrorsProps } from "../../../../shared/forms";

export const useFunctionButtonsToolbar = (
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  formRef: React.RefObject<FormHandles>,
  isSaveAndBack: () => boolean,
) => {
  const navigate = useNavigate();

  const { deleteByID, getByID, create, updateByID } = CitiesService;

  const handleSave = (data: FormDataCity) => {
    formValidationSchema
      .validate(data, {
        abortEarly: false,
      })
      .then((validateData) => {
        setLoading(true);
        if (id === "nova") {
          create(validateData)
            .then((result) => {
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndBack()) {
                  navigate("/cidades");
                } else {
                  navigate(`/cidades/detalhes/${result}`);
                }
              }
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          updateByID(Number(id), validateData)
            .then((result) => {
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndBack()) {
                  navigate("/cidades");
                }
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationError: UnFormErrorsProps = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationError[error.path] = error.message;
        });

        formRef.current?.setErrors(validationError);
      });
  };

  const onDelete = () => {
    deleteByID(Number(id)).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        navigate("/cidades");
      }
    });
  };

  const onBack = () => {
    navigate("/cidades");
  };

  const onNew = () => {
    navigate("/cidades/detalhe/nova");
  };

  const getCity = () => {
    if (id !== "nova") {
      setLoading(true);
      getByID(Number(id))
        .then((data) => {
          if (data instanceof Error) {
            alert(data.message);
            navigate("/cidades");
          } else {
            setName(data.name);
            formRef.current?.setData(data);
          }
        })
        .finally(() => setLoading(false));
    } else {
      formRef.current?.setData({
        name: "",
      });
    }
  };

  return { handleSave, onDelete, onBack, onNew, getCity };
};
