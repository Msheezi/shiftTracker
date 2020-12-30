import React, {useState, useEffect} from 'react'
import { postShiftAPI,  } from "../../functionhelpers";
import {Grid, Button, makeStyles, TextField} from '@material-ui/core/'
import { DateTimePicker } from "@material-ui/pickers";


const useStyles = makeStyles({
  container: {
      alignItems: "center"
  } , 

  buttons: {margin: "5px"
}
})

export const ShiftEditor = ({ shiftObj, shiftId, dispatch, close }) => {
  const [shift, updateShift] = useState(shiftObj);
  // const [status, updateStatus] = useState(false);
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
    postShift(shiftId, shift).then(() => {
        // updateStatus(true)
        close()

    });
  };

  // const closeShift = (shiftId, shift) => {
  //   closeShiftAPI(shiftId, shift)
  //     .then((res) => dispatch({ type: "upload", payload: res.data }))
  //     .catch((err) => console.log(`error: ${err}`));
  // };

  const classes = useStyles()

  let disabled = shift.closed ? true : false;
  // let displayUpdate = status ? "Operation Successful" : null

  return (
    <Grid className={classes.container} container  spacing={2}>
        
        
        <Grid item  xs={12}>

        
          <DateTimePicker
            label="Start Time"
            
            value={startTime}
            onChange={updateStartTime}/>
          
          
        </Grid>
        <Grid item  xs={12}>

        
          <DateTimePicker
            label="End Time"
            
            value={endTime}
            onChange={updateEndTime}/>
          
          
        </Grid>
        <Grid item  xs={12}>

          <TextField
            label="Starting Miles"
            disabled={disabled}
            type="text"
            name="startMiles"
            value={shift.startMiles}
            onChange={handleChange}
            
            />
        </Grid>
        <Grid item  xs={12}>

        
          <TextField
            disabled={disabled}
            label="Ending Miles"
            type="text"
            name="endMiles"
            value={shift.endMiles}
            onChange={handleChange}
            />
        
        </Grid>
        
        <Grid item  xs={12}>

        
          <TextField
            disabled={disabled}
            label="Tips"
            type="text"
            name="tips"
            value={shift.tips}
            onChange={handleChange}
            />
        
            </Grid>
            
        
     
      <div style={{ margin: "10px auto", paddingLeft: "80px", display: "flex", justifyContent: "center" }}>
        <Button className={classes.buttons} color="secondary" variant="outlined" onClick={(e) => close()}>
          Cancel
        </Button>
        <Button className={classes.buttons} color="primary" variant="outlined" onClick={(e) => postUpdate(shiftId, shift)}>
          Submit
        </Button>

        </div>
        </Grid>
  )

}


// const StyledInput = styled.input`
//   /* max-width: 100px; */
//   text-align: center;
//   background-color: white;
// `;

// const StyledLabel = styled.label`
//   margin: 5px;
//   text-align: center;
//   /* background-color: lightgreen; */
//   /* border-radius: 20px; */
// `;

// const StyledButton = styled.button`
//   width: 100px;
//   height: 40px;
//   border: none;
//   background-color: #a3f7b5;
//   border-radius: 5px;
//   margin: 20px 20px 20px 30px;
//   cursor: pointer;
//   &:hover {
//     background-color: #b4f8c3;
//   }
// `;