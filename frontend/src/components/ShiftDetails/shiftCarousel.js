import React from 'react'
import {ShiftDetail} from './shiftDetail'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

const SelectorButton = styled.div`
  color: blue;
  cursor: pointer;
  /* height: 80vh; */
  
  margin: auto;
  /* line-height: 80vh; */
  text-align: center;
  align-items: center; 
  font-size: 1.5rem;
  &:hover {
    background-color: #f0f8fa;
  }
`;

const Closer = styled.div`
  color: black;
  cursor: pointer;
  height: 20px;
  
  text-align: right;
  line-height: 20px;
  /* &:hover {
    background-color: #f0f8fa;
  } */
`;




export const ShiftCarousel = ({selectedShiftIndex, setSelectedShift, shiftKeys})=> {

const transition = (direction, id) => {
  let index = shiftKeys.indexOf(id)
  if (direction === "right" && index < shiftKeys.length - 1) setSelectedShift(shiftKeys[index + 1]) 
  if (direction ==="left" && index > 0 ) setSelectedShift(shiftKeys[index - 1])
     
}
       /**
        * Add a grid container
        * layout the cards for shift highlights
        * space for shift detail 
        */

    return (

      <Grid container alignItems={"center"}>
        <Grid item xs={12} >

                <Closer onClick={() => setSelectedShift(null)}>
                {" "}
                <i
                  className="fas fa-reply"
                 
                  >
                  {" "}
                </i>
                Shifts
              </Closer>
        </Grid>
          
        <Grid item xs={1}>
              <SelectorButton
                onClick={() => transition("left", selectedShiftIndex)}
                >
                <i className="fas fa-angle-left"></i>
              </SelectorButton>
        </Grid>

        <Grid item xs={10}>
              <ShiftDetail
                _id={selectedShiftIndex}
                setSelectedShift={setSelectedShift}
              />
        </Grid>

        <Grid item xs={1}>

            <SelectorButton
              onClick={() => transition("right", selectedShiftIndex)}
              >
              <i className="fas fa-angle-right"></i>
            </SelectorButton>
        </Grid>
        
      </Grid>
    )




}

{/* <>
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
        </> */}