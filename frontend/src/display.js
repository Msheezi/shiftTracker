import React, {useContext} from 'react'
import { ShiftContext } from './shiftContext'
import {ShiftItem} from './shiftItem'


export const Display = () => {
    //read the context value stored in provider
     const data =  useContext(ShiftContext)
 
  let values
  if (data){
      values = data.map(shiftObj => (<ShiftItem key={shiftObj._id} shift={shiftObj}/>))

  } else {
      values = null
  }

   return (
    // null
   values
    //    data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))   

   )
}