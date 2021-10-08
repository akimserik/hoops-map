import Login from "./components/LoginPage";
import MapPage from "./components/MapPage";
import { LOGIN_ROUTE, MAP_ROUTE } from "./utils/constants";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: Login,
  },
  {
    path: MAP_ROUTE,
    component: MapPage,
  },
];
