import React, {useContext,  useEffect, useState} from 'react'
// import { ShiftContext } from '../shiftContext'
import {ShiftItem} from './shiftItem'
import styled from 'styled-components'
import {Store} from '../../store'
import { frontEndFetch, fetchShiftsAPI, addNewShiftAPI} from '../../functionhelpers'
import ShiftDetail from '../ShiftDetails/shiftDetail'

// import reducer from '../reducer'

const Container = styled.div`
    width: 80%;
   
`

const SelectorButton = styled.div`
  color: red;
  cursor: pointer;

`

export const Summary = () => {
 

  const {state, dispatch} = useContext(Store)
  const [selectedShiftIndex, setSelectedShift] = useState(null)
  const [shiftKeyArray, setShiftKeyArray] = useState(null)
    let shiftKeys = Object.keys(state.shifts);


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

  const right = (id) => {
    let index = shiftKeys.indexOf(id)

    if (index < shiftKeys.length - 1){
      setSelectedShift(shiftKeys[index + 1])
    }
  }
  const left = (id) => {
    let index = shiftKeys.indexOf(id);

    if (index > 0) {
    
      setSelectedShift(shiftKeys[index - 1]);
    }
  }

  
  let values;
  if (state) {
    let shiftArray = frontEndFetch(state.shifts)
    
    values = shiftArray.map((shiftObj, idx) => (
      <ShiftItem key={shiftObj._id} shift={shiftObj} number ={idx} setSelectedShift={setSelectedShift}/>
    )).reverse();
  } else {
    values = null;
  }

  if (selectedShiftIndex){
   return (
     <>
       <SelectorButton onClick={() => left(selectedShiftIndex)}>
         Left
       </SelectorButton>
       <SelectorButton onClick={() => right(selectedShiftIndex)}>
         Right
       </SelectorButton>
       <ShiftDetail
         _id={selectedShiftIndex}
         setSelectedShift={setSelectedShift}
       />
     </>
   );
  } else {

    return (
      
      <Container>
      {values}
      
      <button onClick={ e => addNewShift()}>New Shift</button>
    </Container>
  );
}
}


