import React from 'react'
import {ShiftTable} from '../ShiftIndex/shiftsTable'
import styled from 'styled-components'
import Grid  from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';


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
    border: 0.1px solid blue;
    transition-duration: 0.2s;
    transform: scale(1.01);
  }
`;


const useStyles = makeStyles({
    container: {
        margin: "5px",
        padding: "5px"
    }, 

})



export const ShiftsIndexPage = ({shifts, setSelectedShift, addNewShift}) => {

        const classes = useStyles()

    return (

        <Grid className={classes.container} container>
            <Grid item xs={1} sm={2}/>
            <Grid item xs={12} sm={8}>
                <ShiftTable 
                    shifts={shifts} 
                    setSelectedShift={setSelectedShift} 
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                
                    <StyledButton onClick={(e) => addNewShift()} >
                        Add Shift
                    </StyledButton>
                    <StyledButton>Metrics </StyledButton>
                
              </Grid>
            <Grid item xs={false} sm={1}/>
          </Grid>
          


    )
} 


//  const IndexContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 3fr 1fr 1fr;
//   grid-template-areas: " lspacer columns button rspacer ";
//   justify-content: center;
//   margin: 50px auto;

// `;

// const GridContainer = styled.div`
//   grid-area: ${(props) => props.gridArea};
  
//   height: 400px;
 
// `
// const ButtonContainer = styled.div`
//   grid-area: ${(props) => props.gridArea};
//   display: flex;
//   flex-direction: column;
// `




