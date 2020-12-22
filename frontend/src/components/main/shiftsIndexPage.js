import React from 'react'
import {ShiftTable} from '../ShiftIndex/shiftsTable'
import styled from 'styled-components'


const IndexContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  grid-template-areas: " lspacer columns button rspacer ";
  justify-content: center;
  margin: 50px auto;

`;

const GridContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  
  height: 400px;
 
`
const ButtonContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  display: flex;
  flex-direction: column;
`




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

export const ShiftsIndexPage = ({shifts, setSelectedShift, addNewShift}) => {


    return (

        <>
         <IndexContainer>
          <GridContainer gridArea={"columns"}  >

            <ShiftTable 
              
              shifts={shifts} 
              setSelectedShift={setSelectedShift} 
            />
          </GridContainer>
          <ButtonContainer gridArea={"button"}>

              <StyledButton onClick={(e) => addNewShift()} >
                Add Shift
              </StyledButton>
            
              <StyledButton>Metrics </StyledButton>
           </ButtonContainer>
         </IndexContainer>
          </>


    )
} 