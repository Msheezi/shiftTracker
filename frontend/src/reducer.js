import React, {useReducer, useContext} from 'react'
import { ShiftContext } from "./shiftContext";

const initialState = useContext(ShiftContext)

const Reducer = (state, action) => {
   switch (action.type){
       case "new":
       
       case "update":

       case "close":

       default:
           return state

   }
}

export default Reducer