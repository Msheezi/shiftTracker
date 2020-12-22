import React from 'react'
import styled from "styled-components";
// import {ShiftTable} from 
import {ShiftCarousel} from '../ShiftIndex/shiftCarousel'

const DetailContainer = styled.div`
  width: 80%;
  display: grid;
  /* margin-left: 10%; */
  /* margin-top: 50px; */
  margin: 50px auto;
  grid-template-areas: 
  
  "navleft data navright closer"
  ;
`;

export const ShiftsDetailsPage = ({selectedShiftIndex, setSelectedShift, shiftKeys}) => {


    return (

    <DetailContainer>
        <ShiftCarousel 
          selectedShiftIndex={selectedShiftIndex} 
          setSelectedShift={setSelectedShift} 
          shiftKeys={shiftKeys} />
      </DetailContainer>

    )
}

