import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {Store} from '../../store'
import { getShiftAPI, fetchShiftsAPI} from '../../functionhelpers'
import { ShiftDisplay} from './shiftdisplay'
import {ShiftEdit} from './shiftDetailUpdater'
import styled from 'styled-components'

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;


`



const ShiftDetail =  (props) => {
    const shiftId = props.match.params.shiftId
    const {state,  dispatch} = useContext(Store)
    const [shift, updateShift] = useState();

    const getShift = (shiftId) => {
       getShiftAPI(shiftId)
      .then((res) => updateShift(res.data))
      .catch(err => {
        console.log(`error:` + err)
      })
    }

    
    useEffect(()=>{
      if (!shift){
        getShift(shiftId)
      }
      // console.log("am i running 1")
    },[shiftId,])

    
   useEffect(()=> {
      Object.keys(state.shifts).length === 0 && fetchShiftsAPI()
        .then(res => dispatch({ type: "fetch", payload: res.data }))
        .catch(err=>console.log(err))
    })
    
  

      let testShift = state.shifts[shiftId]

    return shift ? (
      <Container>
        <ShiftDisplay shiftObj={testShift}/>
        <ShiftEdit shiftObj={shift} shiftId={shiftId} dispatch={dispatch}/>
      </Container>
    ) : null;
  
    
};

export default withRouter(ShiftDetail)


