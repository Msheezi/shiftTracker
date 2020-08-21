import React, {useContext} from 'react'
import { ShiftContext } from './shiftContext'


export const Display = () => {
     const data =  useContext(ShiftContext)
  // add in the user call here in context, now you have the user Id and can pull from context
  // do i put the shifts in here too?  and maybe some theming?
  // let values = data.map(shift =>(
  //   <div>{shift.startDateTime}</div>
  // ))
  console.log(data)
  // let values = 
  let values
  if (data){
       values = data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))

  } else {
      values = null
  }

   return (
    // null
   values
    //    data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))   

   )
}