import { Datagrid, List, NumberField, TextField } from "react-admin";

export const BillionaireStatsList = () => (
  <List title="Billionaire Stats" pagination={false}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="countryOfCitizenship" />
      <NumberField source="count" label="Billionaire count" />
      <NumberField source="averageAge" />
      <NumberField source="averageFinalWorth" />
    </Datagrid>
  </List>
);
