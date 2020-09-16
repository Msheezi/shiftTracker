import React from 'react'

import styled from 'styled-components'
import { converDateString } from "../../functionhelpers";

const Container = styled.div`

    margin: 20px auto;
    width: 80%;
    display: grid;
    row-gap: 5px;
    grid-template-areas:

    "startPic  startTimeL endTimeL ttlHours"
    "startPic  startTimeL endTimeL ttlHours"
    "startM   . . . "
    "endPic    ttlM ttltips comp"
    "endPic    ttlM ttltips comp"
    "endM      . . closed"
    ;
    

    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;


`
const DisplayItem = styled.div`
    margin: auto;
    margin-right: 20px;
    width: 150px;
    text-align: center;
    grid-area: ${props => props.gridArea} ;
    


`

const DisplayImg = styled.img`
  width: 200px;
  height: 200px;
  grid-row-start: ${props => props.rowStart}; 
   grid-row-end: span 2;
   margin-right: 20px;


`

const DispItemHead = styled.div`
  background-color: lightgreen;
  border-radius: 20px;
  vertical-align: center;
  margin: auto;
`

const DispItemVal = styled.div`
  margin-top: 5px;
  background-color: white;
  border-radius: 20px;
  border: 0.25px solid grey;
  background-color: ${props => props.bgcolor ? "red" : "white"};
`


export const ShiftDisplay = ({shiftObj})=> {
   
    if (shiftObj) {

        
        const { 
            startDateTime, endDateTime, 
            startMiles, endMiles, ttlMiles, 
            tips = 0, ttlComp = 0, closed , startingUrl, endingUrl} = shiftObj
            
            // console.log(`shiftObj: ${shiftObj}`)
            
            
            return (
              <Container>
                <DisplayImg
                  gridArea={"startPic"}
                  rowStart={1}
                  src={startingUrl}
                  alt="Starting Mileage"
                />
                <DisplayImg
                  gridArea={"endPic"}
                  rowStart={4}
                  src={endingUrl}
                  alt="Ending Mileage"
                />
                <DisplayItem
                  gridArea={"startM"}
                >{`Starting Miles: ${startMiles}`}</DisplayItem>
                <DisplayItem
                  gridArea={"endM"}
                >{`Ending Miles: ${endMiles}`}</DisplayItem>

                <DisplayItem gridArea={"startTimeL"}>
                  <DispItemHead>Start Time</DispItemHead>
                  <DispItemVal>{converDateString(startDateTime)}</DispItemVal>
                </DisplayItem>
                <DisplayItem gridArea={"endTimeL"}>
                  <DispItemHead>End Time</DispItemHead>
                  <DispItemVal>
                    {converDateString(endDateTime) || "Shift Open"}
                  </DispItemVal>
                </DisplayItem>
                <DisplayItem gridArea={"ttlM"}>
                  <DispItemHead>Total Miles</DispItemHead>
                  <DispItemVal>{ttlMiles}</DispItemVal>
                </DisplayItem>
                <DisplayItem gridArea={"ttltips"}>
                  <DispItemHead>Tips</DispItemHead>
                  <DispItemVal>{tips}</DispItemVal>
                </DisplayItem>
                <DisplayItem gridArea={"comp"}>
                  <DispItemHead>Earnings</DispItemHead>
                  <DispItemVal>{ttlComp}</DispItemVal>
                </DisplayItem>
                <DisplayItem gridArea={"closed"}>
                  <DispItemHead>Shift Status</DispItemHead>
                  <DispItemVal bgcolor={closed}>
                    {closed ? "Closed" : "Open"}
                  </DispItemVal>
                </DisplayItem>
              </Container>
            );
} else {
    return null
}
}

