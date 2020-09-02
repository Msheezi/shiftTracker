import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {Store} from '../../store'
import { getShiftAPI, fetchShiftsAPI} from '../../functionhelpers'
import { ShiftDisplay} from './shiftdisplay'
import {ShiftEdit} from './shiftDetailUpdater'



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
      <>
        <ShiftDisplay shiftObj={testShift}/>
        <ShiftEdit shiftObj={shift} shiftId={shiftId} dispatch={dispatch}/>
      </>
    ) : null;
  
    
};

export default withRouter(ShiftDetail)


