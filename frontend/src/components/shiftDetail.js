import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const postUpdate = (shiftId, shift) => axios.patch(`/shifts/${shiftId}`, shift);
const closeShift = (shiftId, shift) => axios.patch(`/shifts/close/${shiftId}`, shift);


const ShiftDetail =  (props) => {
    const shiftId = props.match.params.shiftId
    const [shift, updateShift] = useState();
    const handleChange = (e) => {
        let newState = {...shift,[e.target.name]: e.target.value }
        return updateShift(newState)
    }

    useEffect(()=>{
        //  axios.get(`/shifts/${shiftId}`).then(res => updateShift(res.data))
         axios
           .get(`/shifts/${shiftId}`)
           .then((res) => updateShift(res.data))
           .catch(err => {
               console.log(`error:` + err)
           })
    }, [])

    return shift ? (
      <div style={{ display: "flex" }}>
        <label>
          Start Time:
          <input
            type="text"
            value={shift.startDateTime}
            name="startDateTime"
            onChange={handleChange}
          />
        </label>
        <label>
          Starting Miles
          <input
            type="text"
            name="startMiles"
            value={shift.startMiles}
            onChange={handleChange}
          />
        </label>
        <label>
          Ending Miles
          <input
            type="text"
            name="endMiles"
            value={shift.endMiles}
            onChange={handleChange}
          />
        </label>
        <label>
          Tips
          <input
            type="text"
            name="tips"
            value={shift.tips}
            onChange={handleChange}
          />
        </label>
        <button onClick={(e) => postUpdate(shiftId, shift)}>Submit</button>
        <button onClick={(e) => closeShift(shiftId, shift)}>Close</button>
      </div>
    ) : null;
  
    
};

export default withRouter(ShiftDetail)