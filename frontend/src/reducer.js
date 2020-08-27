import React, {useReducer, useContext} from 'react'
import { ShiftContext } from "./shiftContext";

const initialState = {shifts: []}

const reducer = (state ={}, action) => {
    let newState
   switch (action.type){
       case "new":
        newState = {...state}
        newState.shifts.push(action.payload)
        console.log(state)
        return newState
       case "update":
        let intermediateState = {...state}
        newState = intermediateState.filter(shiftObj=> shiftObj._id != action.payload._id)
        newState.push(action.payload)
       return newState
    //    case "close":

       default:
           return state

   }
}

export default reducer