import { Admin, Resource } from "react-admin";
import { dataProvider } from "./data-provider";
import { BillionaireList } from "./components/BillionaireList";
import { BillionaireEdit } from "./components/BillionaireEdit";
import { BillionaireShow } from "./components/BillionaireShow";
import { BillionaireCreate } from "./components/BillionaireCreate";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="billionaires"
      list={BillionaireList}
      edit={BillionaireEdit}
      show={BillionaireShow}
      create={BillionaireCreate}
    />
  </Admin>
);
