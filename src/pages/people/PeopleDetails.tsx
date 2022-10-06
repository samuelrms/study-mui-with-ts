import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";

import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services";

export const PeopleDetails: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const onSave = () => {
    console.log();
  };

  const onSaveBack = () => {
    console.log();
  };

  const onDelete = (id: string) => {
    if (confirm("Deseja apagar o registro?")) {
      PeopleService.deleteByID(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate("/pessoas");
        }
      });
    }
  };

  const onBack = () => {
    navigate("/pessoas");
  };

  const onNew = () => {
    navigate("/pessoas/detalhe/nova");
  };

  useEffect(() => {
    if (id !== "nova") {
      setLoading(true);
      PeopleService.getByID(Number(id))
        .then((data) => {
          if (data instanceof Error) {
            alert(data.message);
            navigate("/pessoas");
          } else {
            console.log(data);
            setName(data.fullName);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <LayoutBasePage
      title={id !== "nova" ? name : "Nova pessoa"}
      toolbar={
        <ToolbarDetails
          textButtonNew="Nova"
          showButton={{
            new: id === "nova",
            delete: id === "nova",
            back: false,
            save: false,
            saveAndBack: false,
          }}
          handleClick={{
            new: onNew,
            back: onBack,
            delete: () => onDelete(id),
            save: onSave,
            saveAndBack: onSaveBack,
          }}
        />
      }
    >
      {loading && <LinearProgress variant="indeterminate" />}
      PeopleDetails {id}
    </LayoutBasePage>
  );
};
