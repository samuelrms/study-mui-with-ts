import { useNavigate } from "react-router-dom";
import { FormHandles } from "@unform/core";

import { PeopleService } from "../../../shared/services";
import { FormData } from "../PeopleDetails";

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
    setLoading(true);
    if (id === "nova") {
      create(data)
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
      updateByID(Number(id), data)
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
