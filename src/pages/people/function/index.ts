import { useNavigate } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as yup from "yup";

import { PeopleService } from "../../../shared/services";
import { FormData } from "../PeopleDetails";
import { formValidationSchema } from "../validation/formValidation";
import { UnFormErrorsProps } from "../../../shared/forms";

export const useFunctionButtonsToolbar = (
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  formRef: React.RefObject<FormHandles>,
  isSaveAndBack: () => boolean,
) => {
  const navigate = useNavigate();

  const { deleteByID, getByID, create, updateByID } = PeopleService;

  const handleSave = (data: FormData) => {
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
                  navigate("/pessoas");
                } else {
                  navigate(`/pessoas/detalhes/${result}`);
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
                  navigate("/pessoas");
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
        navigate("/pessoas");
      }
    });
  };

  const onBack = () => {
    navigate("/pessoas");
  };

  const onNew = () => {
    navigate("/pessoas/detalhe/nova");
  };

  const getPeople = () => {
    if (id !== "nova") {
      setLoading(true);
      getByID(Number(id))
        .then((data) => {
          if (data instanceof Error) {
            alert(data.message);
            navigate("/pessoas");
          } else {
            setName(data.fullName);
            formRef.current?.setData(data);
          }
        })
        .finally(() => setLoading(false));
    } else {
      formRef.current?.setData({
        name: "",
        fullName: "",
        email: "",
        age: "",
        cityID: "",
      });
    }
  };

  return { handleSave, onDelete, onBack, onNew, getPeople };
};
