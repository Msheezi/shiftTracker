import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  /* line-height: 50px; */
  height: 75px;
  max-width: 1000px;
  min-width: 850px;
  background-color: ${(props) => (props.number % 2 === 0 ? "white" : "white")};
  overflow: hidden;
  /* border: 0.25px solid black; */
  border-radius: 5px;
  list-style-type: none;
  padding: 0;
  position: relative;
  margin: 5px auto;
  box-shadow: -2px -1px 2px lightgray, 2px 2px 2px lightgray;
  display: grid;
  grid-template-areas:
    " dateHeader hrsHeader milesHeader compHeader "
    " dateval hrsval milesval compval ";
  grid-template-rows: 40px 25px;
  grid-template-columns: repeat(5, 1fr);
  box-sizing:border-box;

  &:hover {
    border: 0.25px solid blue;
    border-color: #1e7e34;
    /* background-color: #FCDDBC; */
    cursor: pointer;
    transition-duration: 0.4s;
    transform: scale(1.02);
  }
`;
const MyDiv = styled.div`
  margin-left: 20px;
  /* display: inline; */
`;

const Value = styled.div`
  margin-right: 10px;
  /* display: inline; */
  grid-area: ${(props) => props.gridArea};
  line-height: 25px;
  text-align: center;
  align-self: start;
  justify-self: center;
  box-sizing: border-box;
  /* height: 25px; */
`;

const Header = styled.div`
  margin-right: 10px;
  grid-area: ${(props) => props.gridArea};
  text-align: center;
  /* text-decoration: underline; */
  align-self: end;
  font-size: 16pt;
`;
const Button = styled.div`
  /* border: 0.5px solid black; */
  background-color: ${(props) => (props.status ? "#E23C4A" : "#a3f7b5")};
  box-shadow: 2px 2px 2px lightgray;

  border-radius: 5px;
  /* padding: 5px; */
  /* width: 25px; */
  text-align: center;
  margin: 0 auto;
  /* justify-self: flex-end; */
  /* display: inline; */
  /* float: right; */
  width: 60px;
  /* z-index: 1; */
  /* overflow: hidden; */
  box-sizing: border-box;
  position: absolute;
  right: 15px;
  top: 25px;
  height: 25px;
  line-height: 25px;
`;

const converDateString = (dateString, time) => {
  let [month, date, year] = new Date(dateString)
    .toLocaleDateString()
    .split("/");
  let [hour, minute] = new Date(dateString)
    .toLocaleTimeString()
    .slice(0, 7)
    .split(":");
  if(time){
    return `${hour}:${minute}`
  } else {
    // return `${month}/${date}/${year} ${hour}:${minute}`;
    return `${month}/${date}/${year}`;

  }
};

export const ShiftItem = ({
  number,
  setSelectedShift,
  shift: {
    _id,
    startDateTime,
    endDateTime,
    startMiles,
    endMiles,
    shiftDuration,
    ttlMiles,
    tips = 0,
    ttlComp = 0,
    closed,
  },
}) => {
  let startDate = converDateString(startDateTime)
  let start = converDateString(startDateTime, "true");
  let end = endDateTime ? converDateString(endDateTime, "true") : "00:00";
  let shiftStatus = closed ? (
    <Button status={closed}>Closed</Button>
  ) : (
    <Button status={closed}>Edit</Button>
  );

  return (
    //    <Link style={{textDecoration: "none", color: "black"}} to={`shift/${_id}`}>

    <Container number={number} onClick={() => setSelectedShift(_id)}>
    
      <Header gridArea={"dateHeader"}>Date</Header>
        <Value gridArea={"dateval"}>{startDate}</Value>
      
      <Header gridArea={"hrsHeader"}>Hours Worked</Header>
        <Value gridArea={"hrsval"}>{shiftDuration || 0.00}</Value>
      
      <Header gridArea={"milesHeader"}>Miles</Header>
        <Value gridArea={"milesval"}> {ttlMiles}</Value>
      
      <Header gridArea={"compHeader"}>Earnings</Header>
        <Value gridArea={"compval"}> {ttlComp}</Value>
      
      {shiftStatus}
    </Container>

    //    </Link>
  );
};
