import "./app.css";
import Header from "./components/Header";
import MapPage from "./components/MapPage";
import LoginPage from "./components/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { MAP_ROUTE } from "./utils/constants";

function App() {
  return (
    <div className="main-div">
      <Router>
        <Header />
        <Switch>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Redirect to={MAP_ROUTE} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
