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
    //    case "update":

    //    case "close":

       default:
           return state

   }
}

export default reducer