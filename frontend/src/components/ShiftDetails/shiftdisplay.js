import React from 'react'

import styled from 'styled-components'

const Container = styled.div`

    margin: 20px auto;
    width: 80%;
    display: flex;
    justify-content: space-around;
    


`
const DisplayItem = styled.div`
    margin: 5px;
    width: 12.5%;
    text-align: center;


`


export const ShiftDisplay = ({shiftObj})=> {
   
    if (shiftObj) {

        
        const { 
            startDateTime, endDateTime, 
            startMiles, endMiles, ttlMiles, 
            tips = 0, ttlComp = 0, closed } = shiftObj
            
            // console.log(`shiftObj: ${shiftObj}`)
            
            
            return (
               <Container>

                    <DisplayItem>{`Start Time: ${startDateTime}`}</DisplayItem>
                    <DisplayItem>{`End Time: ${endDateTime}`}</DisplayItem>
                    <DisplayItem>{`Starting Miles: ${startMiles}`}</DisplayItem>
                    <DisplayItem>{`Ending Miles: ${endMiles}`}</DisplayItem>
                    <DisplayItem>{`Total Miles: ${ttlMiles}`}</DisplayItem>
                    <DisplayItem>{`Tips: ${tips}`}</DisplayItem>
                    <DisplayItem>{`Earnings: ${ttlComp}`}</DisplayItem>
                    <DisplayItem>{`Closed?: ${closed}`}</DisplayItem>
               </Container>
    
    
  


)
} else {
    return null
}
}

