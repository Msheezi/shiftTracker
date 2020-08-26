import React, {useContext} from 'react'
import { ShiftContext } from '../shiftContext'
import {ShiftItem} from './shiftItem'
import styled from 'styled-components'
import Axios from 'axios'

const Container = styled.div`
    width: 80%;
   
`

export const Summary = () => {
    //read the context value stored in provider
     const data =  useContext(ShiftContext)

     const newShift = () => Axios.post("shifts/newshift")
 
  let values
  if (data){
      values = data.map((shiftObj, idx) => (<ShiftItem key={shiftObj._id} shift={shiftObj} number={idx} />))

  } else {
      values = null
  }

   return (
    // null
    
       <Container>
           {values}
           <button onClick={newShift}>New Shift</button>
        </Container>    

    
    //    data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))   

   )
}