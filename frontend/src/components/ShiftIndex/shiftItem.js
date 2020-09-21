import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  line-height: 50px;
  height: 150px;
  max-width: 1000px;
  min-width: 850px;
  background-color: ${(props) => (props.number % 2 === 0 ? "white" : "white")};
  overflow: hidden;
  /* border: 0.25px solid black; */
  border-radius: 5px;
  list-style-type: none;
  padding: 0;
  position: relative;
  margin: 10px auto;
  box-shadow: -2px -1px 2px lightgray, 2px 2px 2px lightgray;
  display: grid;
  grid-template-areas:
    " date hrsHeader milesHeader compHeader "
    " . hrsval milesval compval ";
  grid-template-rows: auto;
  grid-template-columns: repeat(6, 1fr);

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
  display: inline;
  grid-area: ${(props) => props.gridArea};
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
  top: 10px;
  height: 25px;
  line-height: 25px;
`;

const converDateString = (dateString) => {
  let [month, date, year] = new Date(dateString)
    .toLocaleDateString()
    .split("/");
  let [hour, minute] = new Date(dateString)
    .toLocaleTimeString()
    .slice(0, 7)
    .split(":");

  return `${month}/${date}/${year} ${hour}:${minute}`;
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
  let start = converDateString(startDateTime);
  let end = endDateTime ? converDateString(endDateTime) : "00:00";
  let shiftStatus = closed ? (
    <Button status={closed}>Closed</Button>
  ) : (
    <Button status={closed}>Edit</Button>
  );

  return (
    //    <Link style={{textDecoration: "none", color: "black"}} to={`shift/${_id}`}>

    <Container number={number} onClick={() => setSelectedShift(_id)}>
      {/* <MyDiv> {`${number + 1}.  `} */}
      <Value gridArea={"date"}>{`Shift Start: ${start}`}</Value>
      {/* <Value gridArea={"date"}>{`Shift End: ${end}`}</Value> */}
      {/* <Value>Starting Miles: {startMiles}</Value>
            <Value>Ending Miles: {endMiles}</Value> */}
      <Value gridArea={"milesHeader"}>Total Miles: {ttlMiles}</Value>
      {/* <Value gridArea={"date"} >{`Tips: $${tips.toFixed(2)}`}</Value> */}
      <Value gridArea={"compHeader"}>Total Comp: ${ttlComp}</Value>
      {/* </MyDiv> */}
      {shiftStatus}
    </Container>

    //    </Link>
  );
};
