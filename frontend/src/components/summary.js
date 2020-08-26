import React, {useContext, useReducer, useEffect} from 'react'
import { ShiftContext } from '../shiftContext'
import {ShiftItem} from './shiftItem'
import styled from 'styled-components'
import Axios from 'axios'
import {Store} from '../store'

import reducer from '../reducer'

const Container = styled.div`
    width: 80%;
   
`

export const Summary = () => {
 

    const {state, dispatch} = useContext(Store)

  const fetchShifts = async () => {
    const data = await Axios.get("/shifts/shifts");
    return dispatch({ type: "fetch", payload: data.data });
  };
  //  const [state, dispatch] = useReducer(reducer, data)
  // const { state, dispatch } = useContext(ShiftContext);
  // console.log(state)
  // const data = state

  useEffect(() => {
    state.shifts.length === 0 && fetchShifts();
  });

  const addNewShift = async () =>  {
    const newShift = await Axios.post("shifts/newshift")
    // return dispatch({type: "new", payload: newShift})
    fetchShifts()
  }
      
//   const newShift = () => dispatch({type: "new", payload: Axios.post("shifts/newshift").data})

// const newShift = () dispatch({type: "new"})
//    .then(newShift => dispatch({type: "new", payload: newShift.data}))

  let values;
  if (state) {
    values = state.shifts.map((shiftObj, idx) => (
      <ShiftItem key={shiftObj._id} shift={shiftObj} number={idx} />
    ));
  } else {
    values = null;
  }

  return (
    // null

    <Container>
      {values}
      <button onClick={ e => addNewShift()}>New Shift</button>
    </Container>

    //    data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))
  );
}


 // //read the context value stored in provider
  //  const fetchShifts =  async () => {
  //     const data = await Axios
  //       .get("/shifts/shifts")
  //       return dispatch({type:"fetch", payload: data.data})
  //  }
  // //  const [state, dispatch] = useReducer(reducer, data)
  // // const { state, dispatch } = useContext(ShiftContext);
  // // console.log(state)
  // // const data = state
  // const data = useContext(Store)

  // useEffect(() => {
  //     state.shifts.length === 0 && fetchShifts()
  // })