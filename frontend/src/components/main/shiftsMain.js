import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../store";
import {ShiftsDetailsPage} from './shiftsDetailsPage'
import {ShiftsIndexPage } from './shiftsIndexPage'
    import {DatePicker} from '@material-ui/pickers'


import {
  frontEndFetch,
  fetchShiftsAPI,
  addNewShiftAPI,
} from "../../functionhelpers";



export const ShiftsPage = ({ shifts, location, handleClose, hideMetrics }) => {
  const { state, dispatch } = useContext(Store);
  const [selectedShiftIndex, setSelectedShift] = useState(null);
  const [stateShifts, setStateShifts] = useState([])
  const [searchStartDate, setSearchStartDate] = useState(null)
  const [searchEndDate, setSearchEndDate] = useState(null)
  const [displayShifts, setDisplayShifts ] = useState([])
  const [shiftKeys, setShiftKeys] = useState()

  useEffect(()=> {
    const fetchShifts = async ()=>{
      let {data} = await fetchShiftsAPI()
      dispatch({type: "fetch", payload: data})
    }
    fetchShifts()
    
  }, [dispatch])

  /**
   * This should be rewritten to use a filter method
   * filter method will take from the entry boxes and filter the values based on 
   * the date ranged entered
   * 
   * currently already displaying the filtered shifts
   * 
   * Add in a popup component to provide summary metrics for the displayed shifts
   *  - do I do this on front end or send a backend request to populate the values
   *    in the popup?
   */
  useEffect(()=> {
   if (Object.keys(state.shifts).length) {
    let shiftArray = frontEndFetch(state.shifts)
    setStateShifts(shiftArray)
   }
  },[state])

useEffect(()=>{
  if (stateShifts){

    let [searchStart, searchEnd] = [new Date(searchStartDate), new Date(searchEndDate)]
    const filteredShifts = stateShifts.filter(shift => {
      let shiftStart = new Date(shift.startDateTime)
      let shiftEnd = new Date(shift.endDateTime)
      if (searchStartDate && !searchEndDate){
        return shiftStart >= searchStart
      }
      else if (!searchStartDate && searchEndDate){
        return shiftEnd <= searchEnd
      }
      else if (searchStartDate && searchEndDate){
        return (shiftStart >= searchStart && shiftEnd <= searchEnd)
      }
      else return stateShifts
      
    })
    setDisplayShifts(filteredShifts)
    let newKeys = filteredShifts.map(({_id}) => _id);
    setShiftKeys(newKeys)
  }

  }, [searchStartDate, searchEndDate, shifts, stateShifts])


;


  const addNewShift = () => {
    addNewShiftAPI().then((res) =>
      dispatch({ type: "new", payload: res.data })
    );
  };

  if (stateShifts.length) {
    if (selectedShiftIndex){
      // grid container here with shift detail layout
      return(
        <ShiftsDetailsPage
          selectedShiftIndex={selectedShiftIndex} 
          setSelectedShift={setSelectedShift} 
          shiftKeys={shiftKeys}
        />
      )
     } else {
       
       return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <DatePicker 
                style={{margin: "5px"}}
                label={"Starting Date"}
                value={searchStartDate} 
                onChange={setSearchStartDate}
                disableToolbar
                clearable
                />
                <DatePicker 
                style={{margin: "5px"}}
                label={"Ending Date"}
                value={searchEndDate} 
                onChange={setSearchEndDate}
                disableToolbar
                clearable
                />
            </div>
         
            <ShiftsIndexPage
            shifts={displayShifts}
            setSelectedShift={setSelectedShift} 
            addNewShift={addNewShift}/>
        </div>
         
        
       )
     }


  
} else { return ""}}




// const Container = styled.div`
//   max-width: 1000px;
//   width: 80vw;
//   margin: 0 auto;
//   grid-area: ${props => props.gridArea};
// `;


//   if (location) {
//     shiftKeys = Object.keys(shifts)
//     let shiftArray = frontEndFetch(shifts);
//     searchValues = shiftArray.map((shiftObj, idx) => (
//       <ShiftItem
//         key={shiftObj._id}
//         shift={shiftObj}
//         number={idx}
//         setSelectedShift={setSelectedShift}
//       />
//     ));
    
//   }


//   useEffect(() => {
//     if (!location) {
//       Object.keys(state.shifts).length === 0 &&
//         fetchShiftsAPI()
//           .then((res) => dispatch({ type: "fetch", payload: res.data }))
//           .catch((err) => console.log(err));
//     }
//   });

//   useEffect(()=> {
//     if (location && selectedShiftIndex){
//       hideMetrics();
//     }
//   })

//   const addNewShift = () => {
//     addNewShiftAPI().then((res) =>
//       dispatch({ type: "new", payload: res.data })
//     );
//   };


// const transition = (direction, id) => {
//   let index = shiftKeys.indexOf(id)
//   if (direction === "right") {
//     if (index < shiftKeys.length - 1) {
//       setSelectedShift(shiftKeys[index + 1]);
//     }
//   } 
//  if (direction ==="left") {
//      if (index > 0) {
//           setSelectedShift(shiftKeys[index - 1]);
//         }
//       }
//     }
//   ;


//   const hideDetail = () => {
//     if (location){
//       handleClose(true);
//     }
//     setSelectedShift(null);
//   }

//   let values;
//   if (state) {
//     //rename function, something like formatting
//     let shiftArray = frontEndFetch(state.shifts);

//     values = shiftArray
//       .map((shiftObj, idx) => (
//         <ShiftItem
//           key={shiftObj._id}
//           shift={shiftObj}
//           number={idx}
//           setSelectedShift={setSelectedShift}
//         />
//       ))
//       .reverse();
//   } else {
//     values = null;
//   }

//   let addShift = !location ? (
//     <StyledButton gridArea={"button"} onClick={(e) => addNewShift()}>
//       Add Shift
//     </StyledButton>
//   ) : (
//     ""
//   );
// const fetchShifts =  () => {
//   fetchShiftsAPI()
//     .then(res => dispatch({ type: "fetch", payload: res.data}))

// };

// useEffect(() => {
//    fetchShifts();
// },[]);

/*


//   const fetchShifts =  () => {
//   fetchShiftsAPI()
//     .then(res => dispatch({ type: "fetch", payload: res.data}))

// };

// useEffect(() => {
//    fetchShifts();
// },[]);
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

  <div style={{width: "800px", margin: "50px auto"}}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Date</TableCell>
            <TableCell align="center" >Hours</TableCell>
            <TableCell align="center">Miles</TableCell>
            <TableCell  align="center">Earnings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {values}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
*/ 


// const IndexContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 3fr 1fr 1fr;
//   grid-template-areas: " lspacer columns button rspacer ";
//   justify-content: center;
//   margin: 50px auto;

// `;

// const DetailContainer = styled.div`
//   width: 80%;
//   display: grid;
//   /* margin-left: 10%; */
//   /* margin-top: 50px; */
//   margin: 50px auto;
//   grid-template-areas: 
  
//   "navleft data navright closer"
//   ;
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




// const StyledButton = styled.button`
//   width: 80px;
//   height: 30px;
//   border: none;
//   background-color: #a3f7b5;
//   border-radius: 5px;
//   margin: 20px;
//   margin-left: 15%;
//   cursor: pointer;
//   float: left;
//   line-height: 30px;
//   grid-area: ${(props) => props.gridArea};

//   &:hover {
//     background-color: #b4f8c3;
//     border: 0.5px solid blue;
//     transition-duration: 0.2s;
//     transform: scale(1.01);
//   }
// `;
//  <>
        //  <IndexContainer>
        //   <GridContainer gridArea={"columns"}  >

        //     <ShiftTable 
              
        //       shifts={stateShifts} 
        //       setSelectedShift={setSelectedShift} 
        //     />
        //   </GridContainer>
        //   <ButtonContainer gridArea={"button"}>

        //       <StyledButton onClick={(e) => addNewShift()} >
        //         Add Shift
        //       </StyledButton>
            
        //       <StyledButton>Metrics </StyledButton>
        //    </ButtonContainer>
        //  </IndexContainer>
        //   </>