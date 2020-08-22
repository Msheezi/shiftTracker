import React, {useContext} from 'react'
import { ShiftContext } from './shiftContext'
import {ShiftItem} from './shiftItem'
import styled from 'styled-components'

const Container = styled.div`
    width: 80%;
   
`

export const Display = () => {
    //read the context value stored in provider
     const data =  useContext(ShiftContext)
 
  let values
  if (data){
      values = data.map((shiftObj, idx) => (<ShiftItem key={shiftObj._id} shift={shiftObj} number={idx} />))

  } else {
      values = null
  }

   return (
    // null
    
       <Container>{values}</Container>    

    
    //    data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))   

   )
}