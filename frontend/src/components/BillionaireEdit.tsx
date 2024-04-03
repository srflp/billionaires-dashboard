import { Edit } from "react-admin";
import { BillionaireTitle } from "./BillionaireTitle";
import { BillionaireForm } from "./BillionaireForm";

export const BillionaireEdit = () => (
  <Edit title={<BillionaireTitle />}>
    <BillionaireForm />
  </Edit>
);
