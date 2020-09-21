import React from "react";

import styled from "styled-components";
import { converDateString } from "../../functionhelpers";

const Container = styled.div`
  margin: 50px auto;
  width: 80%;
  display: grid;
  row-gap: 5px;
  grid-template-areas:

    /* "startPic  startTimeL endTimeL ttlHours"
    ".  startTimeL endTimeL ttlHours"
    "startM   . . . "
    "endPic    ttlM ttltips comp"
    ".    ttlM ttltips comp"
    "endM      .  closed ."
    ; */
    "startPic  startTimeL endTimeL ttlHours"
    "startM    ttlM ttltips comp"
    ".   . . . "
    "endPic    . closed ."
    "endM      .  . .";

  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
`;
const DisplayItem = styled.div`
  margin: 0px auto;
  margin-right: 20px;
  width: 150px;
  text-align: center;
  grid-area: ${(props) => props.gridArea};
  box-sizing: border-box;

  overflow: hidden;
`;

const DisplayImg = styled.img`
  width: 200px;
  height: 200px;
  grid-row-start: ${(props) => props.rowStart};
  /* grid-row-end: span 2; */
  margin-right: 20px;
`;
const DisplayMiles = styled.div`
  margin: auto;
  text-align: center;
  grid-area: ${(props) => props.gridArea};
`;
const DispItemHead = styled.div`
  background-color: lightgreen;
  vertical-align: center;
  border-radius: 20px;
  border: 0.5px solid grey;
  margin: auto;
  border-bottom: none;
  border-left: none;
  border-right: none;
`;

const DispItemVal = styled.div`
  /* margin-top: 5px; */
  background-color: white;
  /* border-radius: 20px;
  border: 0.25px solid grey; */
  background-color: ${(props) => (props.bgcolor ? "#EB3633" : "white")};
  border: 1px solid grey;
  z-index: 1;
`;

export const ShiftDisplay = ({ shiftObj }) => {
  if (shiftObj) {
    const {
      startDateTime,
      endDateTime,
      startMiles,
      endMiles,
      ttlMiles,
      tips = 0,
      ttlComp = 0,
      closed,
      startingUrl,
      endingUrl,
      shiftDuration,
    } = shiftObj;

    // console.log(`shiftObj: ${shiftObj}`)

    return (
      <Container>
        <DisplayImg
          gridArea={"startPic"}
          rowStart={1}
          src={
            startingUrl ||
            "https://via.placeholder.com/200.png?text=Add+Starting+Image"
          }
          alt="Starting Mileage Pic"
        />
        <DisplayImg
          gridArea={"endPic"}
          rowStart={4}
          src={
            endingUrl ||
            "https://via.placeholder.com/200.png?text=Add+Ending+Image"
          }
          alt="Ending Mileage Pic"
        />
        <DisplayMiles
          gridArea={"startM"}
        >{`Starting Miles: ${startMiles}`}</DisplayMiles>
        <DisplayMiles
          gridArea={"endM"}
        >{`Ending Miles: ${endMiles}`}</DisplayMiles>

        <DisplayItem gridArea={"startTimeL"}>
          <DispItemHead>
            Start Time
            <DispItemVal>{converDateString(startDateTime)}</DispItemVal>
          </DispItemHead>
        </DisplayItem>

        <DisplayItem gridArea={"endTimeL"}>
          <DispItemHead>
            End Time
            <DispItemVal>
              {converDateString(endDateTime) || "Shift Open"}
            </DispItemVal>
          </DispItemHead>
        </DisplayItem>

        <DisplayItem gridArea={"ttlM"}>
          <DispItemHead>
            Total Miles
            <DispItemVal>{ttlMiles}</DispItemVal>
          </DispItemHead>
        </DisplayItem>

        <DisplayItem gridArea={"ttlHours"}>
          <DispItemHead>
            Shift Duration(hrs)
            <DispItemVal>{shiftDuration}</DispItemVal>
          </DispItemHead>
        </DisplayItem>
        <DisplayItem gridArea={"ttltips"}>
          <DispItemHead>
            Tips
            <DispItemVal>{tips}</DispItemVal>
          </DispItemHead>
        </DisplayItem>
        <DisplayItem gridArea={"comp"}>
          <DispItemHead>
            Earnings
            <DispItemVal>{ttlComp}</DispItemVal>
          </DispItemHead>
        </DisplayItem>
        <DisplayItem gridArea={"closed"}>
          <DispItemHead style={{ marginTop: "100px" }}>
            Shift Status
            <DispItemVal bgcolor={closed}>
              {closed ? "Closed" : "Open"}
            </DispItemVal>
          </DispItemHead>
        </DisplayItem>
      </Container>
    );
  } else {
    return null;
  }
};
