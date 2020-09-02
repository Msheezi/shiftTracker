import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {Store} from '../store'
import { getShiftAPI, postShiftAPI, closeShiftAPI, fetchShiftsAPI} from '../functionhelpers'
import { ShiftDisplay} from './shiftdisplay'



const ShiftDetail =  (props) => {
    const shiftId = props.match.params.shiftId
    const {state,  dispatch} = useContext(Store)
    const [shift, updateShift] = useState();
    const [status, updateStatus] = useState(false)

  console.log(state)
   
    const handleChange = (e) => {
      let newState = { ...shift,[e.target.name]: e.target.value }
        return updateShift(newState)
    }

    const postShift = async (shiftId, shift) => {
      postShiftAPI(shiftId, shift)
      .then(res => dispatch({type: "update", payload: res.data}))
    }

    const postUpdate = (shiftId, shift) => {
      postShift(shiftId, shift)
      .then(()=> updateStatus(true))
    };

     
    const closeShift = (shiftId, shift) => {
      closeShiftAPI(shiftId, shift)
    }

    
  let displayUpdate  = status ? "Operation Successful" : null

    const getShift = (shiftId) => {
       getShiftAPI(shiftId)
      .then((res) => updateShift(res.data))
      .catch(err => {
        console.log(`error:` + err)
      })
    }

    useEffect(()=>{
      if (!shift){
        //  axios.get(`/shifts/${shiftId}`).then(res => updateShift(res.data))
        getShift(shiftId)
      }
      console.log("am i running 1")
    },[shiftId])

    
    useEffect(()=> {
      if (status){
        getShift(shiftId)
        
        // updateStatus(false)
        console.log("am i running")
      }
      
    },[])

    useEffect(()=> {
      Object.keys(state.shifts).length === 0 && fetchShiftsAPI()
        .then(res => dispatch({ type: "fetch", payload: res.data }))
        .catch(err=>console.log(err))
    })
    
    let disabled 
      if (shift) {
      disabled = shift.closed ? true: false 
      }

      let testShift = state.shifts[shiftId]

    return shift ? (
      <>
        <ShiftDisplay shiftObj={testShift}/>
        <div>{displayUpdate}</div>
      <div style={{ display: "flex" }}>
        <label>
          Start Time:
          <input disabled={disabled}
            type="text"
            value={shift.startDateTime}
            name="startDateTime"
            onChange={handleChange}
          />
        </label>
        <label>
          Starting Miles
          <input disabled={disabled}
            type="text"
            name="startMiles"
            value={shift.startMiles}
            onChange={handleChange}
          />
        </label>
        <label>
          Ending Miles
          <input disabled={disabled}
            type="text"
            name="endMiles"
            value={shift.endMiles}
            onChange={handleChange}
          />
        </label>
        <label>
          Tips
          <input disabled={disabled}
            type="text"
            name="tips"
            value={shift.tips}
            onChange={handleChange}
          />
        </label>
        <button onClick={(e) => postUpdate(shiftId, shift)}>Submit</button>
        <button onClick={(e) => closeShift(shiftId, shift)}>Close</button>
      </div>
      </>
    ) : null;
  
    
};

export default withRouter(ShiftDetail)