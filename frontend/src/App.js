import React, {useContext, useEffect} from 'react';

import './css/App.css';
import { Switch, Route,BrowserRouter as Router } from "react-router-dom";
import {Summary} from './components/summary'
import {MainPage } from './components/mainpage'
import ShiftDetail from './components/shiftDetail'
import {Store} from './store'
import Axios from "axios";

function  App() {
//   const {state, dispatch} = useContext(Store)

// const fetchShifts = async () => {
//   const data = await Axios.get("/shifts/shifts");
//   return dispatch({ type: "fetch", payload: data.data });
// };
// //  const [state, dispatch] = useReducer(reducer, data)
// // const { state, dispatch } = useContext(ShiftContext);
// // console.log(state)
// // const data = state

// useEffect(() => {
//   state.shifts.length === 0 && fetchShifts();
// });
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
