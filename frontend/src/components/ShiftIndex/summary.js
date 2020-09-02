import React, {useContext,  useEffect} from 'react'
// import { ShiftContext } from '../shiftContext'
import {ShiftItem} from './shiftItem'
import styled from 'styled-components'
import {Store} from '../../store'
import { frontEndFetch, fetchShiftsAPI, addNewShiftAPI} from '../../functionhelpers'

// import reducer from '../reducer'

const Container = styled.div`
    width: 80%;
   
`

export const Summary = () => {
 

  const {state, dispatch} = useContext(Store)

  const fetchShifts =  () => {
    fetchShiftsAPI()
      .then(res => dispatch({ type: "fetch", payload: res.data}))
    
  };
  

  useEffect(() => {
     fetchShifts();
  },[]);

  const addNewShift =  () =>  {
    addNewShiftAPI()
    .then(res => dispatch({type: "new", payload: res.data}))
    // fetchShifts()
  }

  
  let values;
  if (state) {
    let shiftArray = frontEndFetch(state.shifts)
    
    values = shiftArray.map((shiftObj, idx) => (
      <ShiftItem key={shiftObj._id} shift={shiftObj} number ={idx}/>
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


