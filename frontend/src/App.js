import React from "react";


import "./css/App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ShiftsPage } from "./components/main/shiftsMain";
import { MainPage } from "./components/mainpage";
// import ShiftDetail from './components/ShiftDetails/shiftDetail'
// import {Summary} from './components/Summary/summary'
import { Navbar } from "./components/nav";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "80px", }}>
        <Switch>
          <Route path="/shifts">
            <ShiftsPage />
          </Route>
          {/* <Route path="/summary">
            <Summary />
          </Route> */}
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
