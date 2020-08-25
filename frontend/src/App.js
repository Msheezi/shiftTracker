import React from 'react';

import './css/App.css';
import { Switch, Route,BrowserRouter as Router } from "react-router-dom";
import {Summary} from './components/summary'
import {MainPage } from './components/mainpage'
import ShiftDetail from './components/shiftDetail'


function  App() {

  return (
    <Router>
      <div>
      
        <Switch>
          <Route path="/summary">
            <Summary />
          </Route>
          <Route path="/shift/:shiftId">
            <ShiftDetail  />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
