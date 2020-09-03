import React, {useState, } from 'react'
import styled from 'styled-components'
import {  postShiftAPI, closeShiftAPI, } from '../../functionhelpers'
import {ImageUploader} from './imageUpload'

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
            <ImageUploader shiftId={shiftId} dispatch={dispatch}/>
            <Container>

            <Updated>{displayUpdate}</Updated>

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
            </Container>
        </>
    )
}