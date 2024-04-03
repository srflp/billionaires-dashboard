import { useRecordContext } from "react-admin";

export const BillionaireTitle = () => {
  const record = useRecordContext();
  return <span>Billionaire - {record ? record.personName : ""}</span>;
};
