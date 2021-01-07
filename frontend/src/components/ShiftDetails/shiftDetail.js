import React, {useState, useEffect, useContext} from 'react'

import {Store} from '../../store'
import {  fetchShiftsAPI} from '../../functionhelpers'
import { ShiftDisplay} from './shiftdisplay'
// import {ShiftEdit} from './shiftDetailUpdater'
import {ShiftEditor} from './shiftDialogForm'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core'


const Container = styled.div`
  /* width: 80%; */
  display: flex;
  flex-direction: column;
`
const useStyles = makeStyles({
  root: {
    alignItems: "center",
    padding: "8px"
  }, 
  title: {
    textAlign: "center"
  }
})


export const ShiftDetail =  ({_id, setSelectedShift}) => {
    const shiftId = _id
    const {state,  dispatch} = useContext(Store)
    const [shift, updateShift] = useState(state.shifts[shiftId]);
    const [open, setOpen] = useState(false);

  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    /**
     * dispatch shift_id to delete
     * clear selected shift ID on success
     */
  }

    useEffect(()=>{
      updateShift(state.shifts[shiftId])
    }, [state.shifts, shiftId])
   
   useEffect(()=> {
      Object.keys(state.shifts).length === 0 && fetchShiftsAPI()
        .then(res => dispatch({ type: "fetch", payload: res.data }))
        .catch(err=>console.log(err))
    })
    
    /**
     * add a new component to handle updates to the shift details
     * update images on click to trigger an update dialog for that image
     * update the following details 
      - start time
      - end time
      - starting miles 
      - ending miles 
      - tips
     */
    return shift ? (
      <Container>
        <ShiftDisplay shiftObj={shift} dispatch={dispatch}/>
        <div style={{textAlign:"center", margin: "10px"}}>

         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Details
      </Button>
        </div>
        <div style={{textAlign:"center", margin: "10px"}}>

         <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Delete Shift
      </Button>
        </div>
      <Dialog className={classes.root} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">Update Details</DialogTitle>
        <DialogContent className={classes.title}>
          <ShiftEditor shiftObj={shift} shiftId={shiftId} dispatch={dispatch} close={handleClose}/>
         <br/>
        </DialogContent>
       
      </Dialog>
        
        
      </Container>
    ) : null;
  
    
};

// export default withRouter(ShiftDetail)




 // const getShift = (shiftId) => {
    //    getShiftAPI(shiftId)
    //   .then((res) => updateShift(res.data))
    //   .catch(err => {
    //     console.log(`error:` + err)
    //   })
    // }

    
    // useEffect(()=>{
    //   // if (!shift){
    //   //   getShift(shiftId)
    //   // }
    //   console.log("am i running 1")

    //   getShift(shiftId)
    // },[shiftId])
    // <ShiftEdit shiftObj={shift} shiftId={shiftId} dispatch={dispatch}/>