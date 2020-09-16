import React, {useState, useEffect, } from 'react'
import styled from 'styled-components'
import {  postShiftAPI, closeShiftAPI, converDateString } from '../../functionhelpers'
import {ImageUploader} from './imageUpload'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Updated = styled.div`
        width: 100%;
        color: red;
    `

const Container = styled.div`

    margin: 20px auto;
    width: 80%;
    display: flex;
    justify-content: space-around;
    border-top: 0.5px solid black;
    padding-top: 20px;
    


`

export const ShiftEdit = ( {shiftObj, shiftId, dispatch}) => {
   
    const [shift, updateShift] = useState(shiftObj)
    const [status, updateStatus] = useState(false)
    const [startTime, updateStartTime] = useState(shiftObj.startDateTime)
    const [endTime, updateEndTime] = useState(shiftObj.endDateTime)

    useEffect(() => {
        updateShift(shiftObj)
        console.log("I ran")
    },[shiftObj])

    const handleStartDateChange = (e, date) => {
        let interimShift = {...shift}
        interimShift.startDateTime = date
        updateShift(interimShift)
    }
    
    const handleChange = (e) => {
        let newState = { ...shift, [e.target.name]: e.target.value }
        return updateShift(newState)
    }

    const postShift = async (shiftId, shift) => {
        postShiftAPI(shiftId, shift)
            .then(res => dispatch({ type: "update", payload: res.data }))
            .catch(err => console.log(`error: ${err}`))
    }

    const postUpdate = (shiftId, shift) => {
        shift.startDateTime = Date.parse(startTime)
        shift.endDateTime = Date.parse(endTime);
        console.log(shift)
        postShift(shiftId, shift)
            .then(() => updateStatus(true))
    };


    const closeShift = (shiftId, shift) => {
        closeShiftAPI(shiftId, shift)
            .then(res => dispatch({type: "update", payload: res.data}))
            .catch(err => console.log(`error: ${err}`))

    }


   

    let disabled = shift.closed ? true : false
    let displayUpdate = status ? "Operation Successful" : null
    
   

    return (
      <>
        <ImageUploader shiftId={shiftId} dispatch={dispatch} />
        <Container>
          <Updated>{displayUpdate}</Updated>

          <label>
            Start Time:
            {/* <input disabled={disabled}
                    type="text"
                    value={converDateString(shift.startDateTime)}
                    name="startDateTime"
                    onChange={handleChange}
                /> */}
            <DatePicker
              selected={Date.parse(startTime)}
              onChange={(date) => updateStartTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
          <label>
            End Time:
            <DatePicker
              selected={Date.parse(endTime)}
              onChange={(date) => updateEndTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
          <label>
            Starting Miles
            <input
              disabled={disabled}
              type="text"
              name="startMiles"
              value={shift.startMiles}
              onChange={handleChange}
            />
          </label>
          <label>
            Ending Miles
            <input
              disabled={disabled}
              type="text"
              name="endMiles"
              value={shift.endMiles}
              onChange={handleChange}
            />
          </label>
          <label>
            Tips
            <input
              disabled={disabled}
              type="text"
              name="tips"
              value={shift.tips}
              onChange={handleChange}
            />
          </label>
          <button onClick={(e) => postUpdate(shiftId, shift)}>Submit</button>
          <button onClick={(e) => closeShift(shiftId, shift)}>Close</button>
        </Container>
      </>
    );
}