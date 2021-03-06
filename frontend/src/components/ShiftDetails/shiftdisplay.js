import React, {useState, useEffect} from "react";

import styled from "styled-components";
import { converDateString, deleteShift } from "../../functionhelpers";
import {SimpleCard} from './shiftCard'
import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core'
import {ImageUploader} from './imageUpload'




const DisplayImg = styled.img`
 width: 90%;
 
`;

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    padding: "8px"
  }, 
  title: {
    textAlign: "center"
  }
})

export const ShiftDisplay = ({ shiftObj, dispatch }) => {
  const [miles, setMiles] = useState(0)
  const [hours, setHours] = useState(0)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState("")

   const classes = useStyles()

  const handleClickOpen = (e) => {
    let imageType = e.target.id
    setImage(imageType)
    setOpen(true);
  };

  const handleClose = () => {
    setImage("")
    setOpen(false);
  };

 


  const {
      startDateTime,
      ttlMiles,
      tips = 0,
      ttlComp = 0,
      startingUrl,
      endingUrl,
      shiftDuration,
      _id
    } = shiftObj;

    const dispatch1 = dispatch 

  useEffect(()=> {
     
    
    setMiles(ttlMiles)
    setHours(shiftDuration)
  }, [ttlMiles, shiftDuration])

    // console.log(`shiftObj: ${shiftObj}`)

    return (
      <div>

      <Grid container justify="center" align="center">
        <Grid item xs={12} >
            <SimpleCard
            data={converDateString(startDateTime, true)}
            text={"Shift Start"}
            />
        </Grid>
        <Grid item xs={12} sm={3}   >
            <SimpleCard
              data={miles}
              text={"Miles Driven"}
            />
        </Grid>
        <Grid item xs={12} sm={3} >
          <SimpleCard
            data={hours}
            text={"Hours Worked"}
          />
        </Grid>
        <Grid item xs={12} sm={3} >
          <SimpleCard
            data={tips}
            text={"Tips"}
            />
        </Grid>
        <Grid item xs={12} sm={3} >
          <SimpleCard
            data={ttlComp}
            text={"Gross Earnings"}
            />
        </Grid>
        <Grid item xs={false} sm={1}/>
        <Grid item xs={12} sm={5} >
          <DisplayImg
            src={
              startingUrl ||
              "https://via.placeholder.com/200.png?text=Add+Starting+Image"
            }
            alt="Starting Mileage Pic"
            onClick={e=>handleClickOpen(e)}
            id="startingUrl"
          />
       </Grid>
        
       <Grid item xs={12} sm={5}>
            <DisplayImg
              src={
                endingUrl ||
                "https://via.placeholder.com/200.png?text=Add+Ending+Image"
              }
              alt="Ending Mileage Pic"
              onClick={e=>handleClickOpen(e)}
              id="endingUrl"
          />
       </Grid>
       <Grid item xs={false} sm={1}/> 
      </Grid>
       <Dialog className={classes.root} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">Add/Update Image</DialogTitle>
        <DialogContent className={classes.title}>
          <ImageUploader shiftId={_id}  dispatch={dispatch1} close={handleClose} imageType={image}/>
         <br/>
        </DialogContent>
       
      </Dialog>
      </div>

    );
  } 

/**
 *  {/* <DisplayMiles
          gridArea={"startM"}
          >{`Starting Miles: ${startMiles}`}</DisplayMiles>
          <DisplayMiles
          gridArea={"endM"}
          >{`Ending Miles: ${endMiles}`}</DisplayMiles>
          
          <DisplayItem gridArea={"startTimeL"}>
          <DispItemHead>
          Start Time
          <DispItemVal>{converDateString(startDateTime)}</DispItemVal>
          </DispItemHead>
        </DisplayItem>

        <DisplayItem gridArea={"endTimeL"}>
          <DispItemHead>
            End Time
            <DispItemVal>
              {converDateString(endDateTime) || "Shift Open"}
            </DispItemVal>
          </DispItemHead>
        </DisplayItem>

        <DisplayItem gridArea={"ttlM"}>
          <DispItemHead>
            Total Miles
            <DispItemVal>{ttlMiles}</DispItemVal>
          </DispItemHead>
        </DisplayItem>

        <DisplayItem gridArea={"ttlHours"}>
          <DispItemHead>
            Shift Duration(hrs)
            <DispItemVal>{shiftDuration}</DispItemVal>
          </DispItemHead>
        </DisplayItem>
        <DisplayItem gridArea={"ttltips"}>
          <DispItemHead>
            Tips
            <DispItemVal>{tips}</DispItemVal>
          </DispItemHead>
        </DisplayItem>
        <DisplayItem gridArea={"comp"}>
          <DispItemHead>
            Earnings
            <DispItemVal>{ttlComp}</DispItemVal>
          </DispItemHead>
        </DisplayItem>
        <DisplayItem gridArea={"closed"}>
          <DispItemHead style={{ marginTop: "100px" }}>
            Shift Status
            <DispItemVal bgcolor={closed}>
              {closed ? "Closed" : "Open"}
            </DispItemVal>
          </DispItemHead>
        </DisplayItem> 

        
 * 
 * 
 * 
 * 
 */

//  const DisplayMiles = styled.div`
//   margin: auto;
//   text-align: center;
//   grid-area: ${(props) => props.gridArea};
// `;
// const DispItemHead = styled.div`
//   background-color: lightgreen;
//   vertical-align: center;
//   border-radius: 20px;
//   border: 0.5px solid grey;
//   margin: auto;
//   border-bottom: none;
//   border-left: none;
//   border-right: none;
// `;

// const DispItemVal = styled.div`
//   /* margin-top: 5px; */
//   background-color: white;
//   /* border-radius: 20px;
//   border: 0.25px solid grey; */
//   background-color: ${(props) => (props.bgcolor ? "#EB3633" : "white")};
//   border: 1px solid grey;
//   z-index: 1;
// `;
/* "startPic  startTimeL endTimeL ttlHours"
    ".  startTimeL endTimeL ttlHours"
    "startM   . . . "
    "endPic    ttlM ttltips comp"
    ".    ttlM ttltips comp"
    "endM      .  closed ."
    ; */
    /* "startPic  startTimeL endTimeL ttlHours"
    "startM    ttlM ttltips comp"
    ".   . . . "
    "endPic    . closed ."
    "endM      .  . ." */

    // const DisplayItem = styled.div`
//   margin: 0px auto;
//   margin-right: 20px;
//   width: 150px;
//   text-align: center;
//   grid-area: ${(props) => props.gridArea};
//   box-sizing: border-box;

//   overflow: hidden;
// `;


//  <Grid container>
//         <Grid item>
          
//         </Grid>
//         <CardsContainer
//           gridArea={"cards"}
//         >

//         <SimpleCard
//           data={converDateString(startDateTime, true)}
//           text={"Shift Start"}
//           />
//         <SimpleCard
//           data={miles}
//           text={"Miles Driven"}
//           />
//         <SimpleCard
//           data={hours}
//           text={"Hours Worked"}
//           />
//         <SimpleCard
//           data={tips}
//           text={"Tips"}
//           />
//         <SimpleCard
//           data={ttlComp}
//           text={"Total Earnings"}
//           />
//           </CardsContainer>
//           <ImagesContainer
//             gridArea={"pics"}
//           >

//           <DisplayImg
          
          
//           src={
//             startingUrl ||
//             "https://via.placeholder.com/200.png?text=Add+Starting+Image"
//           }
//           alt="Starting Mileage Pic"
//           />
//         <DisplayImg
          
          
//           src={
//             endingUrl ||
//             "https://via.placeholder.com/200.png?text=Add+Ending+Image"
//           }
//           alt="Ending Mileage Pic"
//           />
//           </ImagesContainer>
       
//       </Grid>

// const Container = styled.div`
//   margin: 50px auto;
  
//   display: grid;
//   row-gap: 5px;
//   grid-template-areas:
//     " cards "
//     " pics";
//   grid-template-rows: auto;
// `;


// const CardsContainer = styled.div`
//   grid-area: ${(props) => props.gridArea};
//   display: flex;

// `
// const ImagesContainer = styled.div`
//   grid-area: ${(props) => props.gridArea};
//   display: flex;
//   justify-content: center;
// `