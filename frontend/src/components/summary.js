import React, {useContext,  useEffect} from 'react'
// import { ShiftContext } from '../shiftContext'
import {ShiftItem} from './shiftItem'
import styled from 'styled-components'
import Axios from 'axios'
import {Store} from '../store'

// import reducer from '../reducer'

const Container = styled.div`
    width: 80%;
   
`

export const Summary = () => {
 

    const {state, dispatch} = useContext(Store)

  const fetchShifts = async () => {
    const data = await Axios.get("/shifts/shifts");
    return dispatch({ type: "fetch", payload: data.data });
  };
  

  useEffect(() => {
    state.shifts.length === 0 && fetchShifts();
  });

  const addNewShift = async () =>  {
    const newShift = await Axios.post("shifts/newshift")
    fetchShifts()
  }

  let values;
  if (state) {
    values = state.shifts.map((shiftObj, idx) => (
      <ShiftItem key={shiftObj._id} shift={shiftObj} number={idx} />
    )).reverse();
  } else {
    values = null;
  }

  return (

    <Container>
      {values}
      <button onClick={ e => addNewShift()}>New Shift</button>
    </Container>
  );
}


