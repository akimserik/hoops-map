import React from "react";
import Header from "./components/Header";
import Map from "./components/Map";

import "./app.css";

function App() {
  return (
    <>
      <Header />
      <div className="main-div">
        <Map />
      </div>
    </>
  );
}

export default App;
