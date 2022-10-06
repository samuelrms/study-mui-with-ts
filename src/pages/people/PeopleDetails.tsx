import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const PeopleDetails: React.FC = () => {
  const { id = "nova" } = useParams<"id">();

  const navigate = useNavigate();

  const onSave = () => {
    console.log();
  };

  const onSaveBack = () => {
    console.log();
  };

  const onDelete = () => {
    console.log();
  };

  const onBack = () => {
    navigate("/pessoas");
  };

  const onNew = () => {
    navigate("/pessoas/detalhe/nova");
  };

  return (
    <LayoutBasePage
      title="Detalhe"
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
            delete: onDelete,
            save: onSave,
            saveAndBack: onSaveBack,
          }}
        />
      }
    >
      PeopleDetails {id}
    </LayoutBasePage>
  );
};
