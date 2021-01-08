import React, {useState}  from 'react'
import {ShiftTable} from '../ShiftIndex/shiftsTable'
import styled from 'styled-components'
import Grid  from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import {Metrics} from '../ShiftIndex/metrics'


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
        
        padding: "5px"
    }, 
    searchContainer: {
      display: "flex",
      justifyContent: "center",
      
    }, 
    picker: {
      margin: "5px"
    }

})



export const ShiftsIndexPage = ({shifts, setSelectedShift, addNewShift}) => {
       
   const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
  //  const [searchStartDate, setSearchStartDate] = useState(null)
  // const [searchEndDate, setSearchEndDate] = useState(null)
  // const [displayShifts, setDisplayShifts ] = useState([])
  const classes = useStyles()



  /**
   * use effect conditions
   * if starting date, filter for objects with starting date >= starting date
   * if ending date, filter for objects with ending date <= ending date
   * if both, filter for objects with date >=starting date && date <= ending date
   */

  // useEffect(()=>{
  //   setDisplayShifts(shifts)
  // },[shifts])

  // useEffect(()=>{
  //   let [searchStart, searchEnd] = [new Date(searchStartDate), new Date(searchEndDate)]
  //     const filteredShifts = shifts.filter(shift => {
  //         let shiftStart = new Date(shift.startDateTime)
  //         let shiftEnd = new Date(shift.endDateTime)
  //       if (searchStartDate && !searchEndDate){
  //         return shiftStart >= searchStart
  //       }
  //       else if (!searchStartDate && searchEndDate){
  //         return shiftEnd <= searchEnd
  //       }
  //       else if (searchStartDate && searchEndDate){
  //         return (shiftStart >= searchStart && shiftEnd <= searchEnd)
  //       }
  //       else return shifts
        
  //     })
  //     setDisplayShifts(filteredShifts)

  // }, [searchStartDate, searchEndDate, shifts])

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  

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
                    <StyledButton onClick={handleOpen}>Metrics </StyledButton>
                
              </Grid>
            <Grid item xs={false} sm={1}/>
              <Dialog className={classes.root} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
               <DialogTitle className={classes.title} id="form-dialog-title">Summary Details</DialogTitle>
        <DialogContent className={classes.title}>
          <Metrics shifts={shifts}/>
        </DialogContent>
         </Dialog>
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




     /* <Grid className={classes.searchContainer} item xs={12} >
            <DatePicker className={classes.picker}
              label={"Starting Date"}
              value={searchStartDate} 
              onChange={setSearchStartDate}
              disableToolbar
              clearable
            />
            <DatePicker className={classes.picker}
                label={"Ending Date"}
                value={searchEndDate} 
                onChange={setSearchEndDate}
                disableToolbar
                clearable
                />
          </Grid> */
