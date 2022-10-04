import React from "react";
import { useParams } from "react-router-dom";
import { ToolbarDetails } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const PeopleDetails: React.FC = () => {
  const { id = "nova" } = useParams<"id">();

  return (
    <LayoutBasePage
      title="Detalhe"
      toolbar={
        <ToolbarDetails
          textButtonNew="Nova"
          showButton={{ saveAndBack: true, new: true, delete: true }}
        />
      }
    >
      PeopleDetails {id}
    </LayoutBasePage>
  );
};
