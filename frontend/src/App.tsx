import { Admin, Resource } from "react-admin";
import { dataProvider } from "./data-provider";
import { BillionaireList } from "./components/BillionaireList";
import { BillionaireEdit } from "./components/BillionaireEdit";
import { BillionaireShow } from "./components/BillionaireShow";
import { BillionaireCreate } from "./components/BillionaireCreate";
import { BillionaireStatsList } from "./components/BillionaireStatsList";
import PersonIcon from "@mui/icons-material/Person";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="billionaires"
      list={BillionaireList}
      edit={BillionaireEdit}
      show={BillionaireShow}
      create={BillionaireCreate}
      icon={PersonIcon}
    />
    <Resource
      name="billionaire-stats"
      list={BillionaireStatsList}
      icon={LeaderboardIcon}
    />
  </Admin>
);
