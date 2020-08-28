import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {Store} from '../store'




const ShiftDetail =  (props) => {
    const shiftId = props.match.params.shiftId
    const { dispatch} = useContext(Store)
    const [shift, updateShift] = useState();
    const [status, updateStatus] = useState(false)
   
    const handleChange = (e) => {
      let newState = { ...shift,[e.target.name]: e.target.value }
        return updateShift(newState)
    }

    const postShift = async (shiftId, shift) =>{
      const data = await axios.patch(`/shifts/${shiftId}`, shift)
      console.log(data.data)
      return dispatch({type: "update", payload: data.data})
    }

    const postUpdate = (shiftId, shift) => {
      postShift(shiftId, shift)
      .then(()=> updateStatus(true))
    };


    const closeShift = (shiftId, shift) => axios.patch(`/shifts/close/${shiftId}`, shift);

    
  let displayUpdate  = status ? "Operation Successful" : null

const getShift = (shiftId) => {
  return (
  axios
    .get(`/shifts/${shiftId}`)
    .then((res) => updateShift(res.data))
    .catch(err => {
      console.log(`error:` + err)
    }))
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

    },[status])

    let disabled 
      if (shift) {
      disabled = shift.closed ? true: false 
      }

    return shift ? (
      <>
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