import React from 'react'
import {ShiftDetail} from '../ShiftDetails/shiftDetail'
import styled from 'styled-components'

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

export const ShiftCarousel = ({selectedShiftIndex, setSelectedShift, shiftKeys})=> {

const transition = (direction, id) => {
  let index = shiftKeys.indexOf(id)
  if (direction === "right" && index < shiftKeys.length - 1) setSelectedShift(shiftKeys[index + 1]) 
  if (direction ==="left" && index > 0 ) setSelectedShift(shiftKeys[index - 1])
     
}
       

    return (
        <>
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
        <Closer gridArea={"closer"} onClick={() => setSelectedShift(null)}>
          {" "}
          <i
            className="fas fa-reply"
            style={{ lineHeight: "20px", marginRight: "2px" }}
          >
            {" "}
          </i>
          Shifts
        </Closer>
        </>
    )




}

