import React, { useContext, useEffect, useState } from "react";
import { ShiftItem } from "./shiftItem";
import styled from "styled-components";
import { Store } from "../../store";
import {
  frontEndFetch,
  fetchShiftsAPI,
  addNewShiftAPI,
} from "../../functionhelpers";
import ShiftDetail from "../ShiftDetails/shiftDetail";


const Container = styled.div`
  max-width: 1000px;
  width: 80vw;
  margin: 0 auto;
  grid-area: ${props => props.gridArea};
`;

const IndexContainer = styled.div`
  display: grid;
  grid-template-columns: 1000px 100px;
  grid-template-areas: " columns button ";
  justify-content: center;
  margin-top: 50px;

`;

const DetailContainer = styled.div`
  width: 80%;
  display: grid;
  margin-left: 10%;
  margin-top: 50px;
  grid-template-areas: 
  
  
  
  "navleft data navright closer"
  ;
`;

const SelectorButton = styled.div`
  color: blue;
  cursor: pointer;
  height: 80vh;
  width: 80px;
  margin: auto;
  line-height: 80vh;
  text-align: center;
  font-size: 40pt;
  &:hover {
    background-color: #f0f8fa;
  }
`;

const Closer = styled.div`
  color: black;
  cursor: pointer;
  height: 20px;
  grid-area: ${props=> props.gridArea};
  text-align: center;
  line-height: 20px;
  &:hover {
    background-color: #f0f8fa;
  }
`;

const DataContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
`;

const StyledButton = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  background-color: #a3f7b5;
  border-radius: 5px;
  margin: 20px;
  margin-left: 15%;
  cursor: pointer;
  float: left;
  line-height: 30px;
  grid-area: ${(props) => props.gridArea};

  &:hover {
    background-color: #b4f8c3;
    border: 0.5px solid blue;
    transition-duration: 0.2s;
    transform: scale(1.01);
  }
`;

export const ShiftsPage = ({ shifts, location, handleClose, hideMetrics }) => {
  const { state, dispatch } = useContext(Store);
  const [selectedShiftIndex, setSelectedShift] = useState(null);
  let shiftKeys = Object.keys(state.shifts);

  let searchValues;

  if (location) {
    shiftKeys = Object.keys(shifts)
    let shiftArray = frontEndFetch(shifts);
    searchValues = shiftArray.map((shiftObj, idx) => (
      <ShiftItem
        key={shiftObj._id}
        shift={shiftObj}
        number={idx}
        setSelectedShift={setSelectedShift}
      />
    ));
    
  }

  useEffect(() => {
    if (!location) {
      Object.keys(state.shifts).length === 0 &&
        fetchShiftsAPI()
          .then((res) => dispatch({ type: "fetch", payload: res.data }))
          .catch((err) => console.log(err));
    }
  });

  useEffect(()=> {
    if (location && selectedShiftIndex){
      hideMetrics();
    }
  })

  const addNewShift = () => {
    addNewShiftAPI().then((res) =>
      dispatch({ type: "new", payload: res.data })
    );
  };


const transition = (direction, id) => {
  let index = shiftKeys.indexOf(id)
  if (direction === "right") {
    if (index < shiftKeys.length - 1) {
      setSelectedShift(shiftKeys[index + 1]);
    }
  } 
 if (direction ==="left") {
     if (index > 0) {
          setSelectedShift(shiftKeys[index - 1]);
        }
      }
    }
  ;


  const hideDetail = () => {
    if (location){
      handleClose(true);
    }
    setSelectedShift(null);
  }

  let values;
  if (state) {
    //rename function, something like formatting
    let shiftArray = frontEndFetch(state.shifts);

    values = shiftArray
      .map((shiftObj, idx) => (
        <ShiftItem
          key={shiftObj._id}
          shift={shiftObj}
          number={idx}
          setSelectedShift={setSelectedShift}
        />
      ))
      .reverse();
  } else {
    values = null;
  }

  let addShift = !location ? (
    <StyledButton gridArea={"button"} onClick={(e) => addNewShift()}>
      Add Shift
    </StyledButton>
  ) : (
    ""
  );

  if (selectedShiftIndex) {
    return (
      <DetailContainer>
        <SelectorButton
          gridArea={"navLeft"}
          onClick={() => transition("left", selectedShiftIndex)}
        >
          <i className="fas fa-angle-left"></i>
        </SelectorButton>

        <DataContainer gridArea={"data"}>
          <ShiftDetail
            _id={selectedShiftIndex}
            setSelectedShift={setSelectedShift}
          />
        </DataContainer>
        <SelectorButton
          gridArea={"navRight"}
          onClick={() => transition("right", selectedShiftIndex)}
        >
          <i className="fas fa-angle-right"></i>
        </SelectorButton>
        <Closer gridArea={"closer"} onClick={() => hideDetail()}>
          {" "}
          <i
            className="fas fa-reply"
            style={{ lineHeight: "20px", marginRight: "2px" }}
          >
            {" "}
          </i>
          Shifts
        </Closer>
      </DetailContainer>
    );
  } else {
    return (
      <IndexContainer>
        <Container gridArea={"columns"}>
          {location ? searchValues : values}
        </Container>
        {addShift}
      </IndexContainer>
    );
  }
};

// const fetchShifts =  () => {
//   fetchShiftsAPI()
//     .then(res => dispatch({ type: "fetch", payload: res.data}))

// };

// useEffect(() => {
//    fetchShifts();
// },[]);
