import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { postShiftAPI, closeShiftAPI } from "../functionhelpers";
import { ImageUploader } from "../components/ShiftDetails/imageUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const Updated = styled.div`
//         width: 100%;
//         color: red;
//     `

const Container = styled.div`
  margin: 5px auto;

  display: flex;
  /* justify-content: space-around; */
  border-top: 0.5px solid black;
  padding-top: 20px;
  padding-left: 80px;
`;

const StyledInput = styled.input`
  max-width: 100px;
  text-align: center;
  background-color: white;
`;

const StyledLabel = styled.label`
  margin: 0px 5px;
  text-align: center;
  background-color: lightgreen;
  border-radius: 20px;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #a3f7b5;
  border-radius: 5px;
  margin: 20px 20px 20px 30px;
  cursor: pointer;
  &:hover {
    background-color: #b4f8c3;
  }
`;

export const ShiftEdit = ({ shiftObj, shiftId, dispatch }) => {
  const [shift, updateShift] = useState(shiftObj);
  const [status, updateStatus] = useState(false);
  const [startTime, updateStartTime] = useState(shiftObj.startDateTime);
  const [endTime, updateEndTime] = useState(shiftObj.endDateTime);

  useEffect(() => {
    updateShift(shiftObj);
    updateStartTime(shiftObj.startDateTime);
    updateEndTime(shiftObj.endDateTime);
  }, [shiftObj]);

  const handleChange = (e) => {
    let newState = { ...shift, [e.target.name]: e.target.value };
    return updateShift(newState);
  };
  // update status, call timeout, then udpate status again
  // set status to an empty string, then update status to the message to user, then revert
  const postShift = async (shiftId, shift) => {
    postShiftAPI(shiftId, shift)
      .then((res) => dispatch({ type: "upload", payload: res.data }))
      .catch((err) => console.log(`error: ${err}`));
  };

  const postUpdate = (shiftId, shift) => {
    shift.startDateTime = Date.parse(startTime);
    shift.endDateTime = Date.parse(endTime);
    //console.log(shift);
    postShift(shiftId, shift).then(() => updateStatus(true));
  };

  const closeShift = (shiftId, shift) => {
    closeShiftAPI(shiftId, shift)
      .then((res) => dispatch({ type: "upload", payload: res.data }))
      .catch((err) => console.log(`error: ${err}`));
  };

  let disabled = shift.closed ? true : false;
  // let displayUpdate = status ? "Operation Successful" : null

  return (
    <>
      <ImageUploader shiftId={shiftId} dispatch={dispatch} />
      <div style={{ marginTop: "20px" }}></div>
      <h2 style={{ textAlign: "center", margin: "0px" }}>Edit Your Shift</h2>
      <Container>
        {/* <Updated>{displayUpdate}</Updated> */}
        <br />
        <StyledLabel>
          Start Time
          <br />
          <DatePicker
            selected={Date.parse(startTime)}
            onChange={(date) => updateStartTime(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </StyledLabel>
        <StyledLabel>
          End Time
          <br />
          <DatePicker
            selected={Date.parse(endTime)}
            onChange={(date) => updateEndTime(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </StyledLabel>
        <StyledLabel>
          Starting Miles
          <br />
          <StyledInput
            disabled={disabled}
            type="text"
            name="startMiles"
            value={shift.startMiles}
            onChange={handleChange}
          />
        </StyledLabel>
        <StyledLabel>
          Ending Miles
          <br />
          <StyledInput
            disabled={disabled}
            type="text"
            name="endMiles"
            value={shift.endMiles}
            onChange={handleChange}
          />
        </StyledLabel>
        <StyledLabel>
          Tips
          <br />
          <StyledInput
            disabled={disabled}
            type="text"
            name="tips"
            value={shift.tips}
            onChange={handleChange}
          />
        </StyledLabel>
        <br />
      </Container>
      <div style={{ margin: "0px auto", paddingLeft: "80px", display: "flex", justifyContent: "center" }}>
        <StyledButton onClick={(e) => postUpdate(shiftId, shift)}>
          Submit
        </StyledButton>

        <StyledButton onClick={(e) => closeShift(shiftId, shift)}>
          Close
        </StyledButton>
      </div>
    </>
  );
};
