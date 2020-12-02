import React, { useContext, useEffect, useState } from "react";
// import { ShiftItem } from "./shiftItemTable";
import styled from "styled-components";
import { Store } from "../../store";
import {
  frontEndFetch,
  fetchShiftsAPI,
  addNewShiftAPI,
} from "../../functionhelpers";
import {ShiftTable} from './shiftsTable'
import {ShiftCarousel} from './shiftCarousel'
import ShiftDetail from "../ShiftDetails/shiftDetail";
import { ShiftDisplay } from "../ShiftDetails/shiftdisplay";



const Container = styled.div`
  max-width: 1000px;
  width: 80vw;
  margin: 0 auto;
  grid-area: ${props => props.gridArea};
`;

const IndexContainer = styled.div`
  display: grid;
  grid-template-columns: 800px 100px;
  grid-template-areas: " columns button ";
  justify-content: center;
  margin-top: 50px;

`;

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

const GridContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  
  height: 400px;
 
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

export const ShiftsPage = ({ shifts, location, handleClose, hideMetrics }) => {
  const { state, dispatch } = useContext(Store);
  const [selectedShiftIndex, setSelectedShift] = useState(null);
  const [stateShifts, setStateShifts] = useState([])
  let shiftKeys = Object.keys(state.shifts);

  let searchValues;
  // do the search values on the front end. apply filter to state shifts based on date range, don't make it a 
  //back end call
  useEffect(()=> {
    const fetchShifts = async ()=>{
      let {data} = await fetchShiftsAPI()
      dispatch({type: "fetch", payload: data})
    }
    fetchShifts()
    
  }, [dispatch])

  useEffect(()=> {
   if (Object.keys(state.shifts).length) {
    let shiftArray = frontEndFetch(state.shifts)
    setStateShifts(shiftArray)
   }
  },[state])

;


  const addNewShift = () => {
    addNewShiftAPI().then((res) =>
      dispatch({ type: "new", payload: res.data })
    );
  };

  if (stateShifts.length) {
    if (selectedShiftIndex){
      return(
      
       <DetailContainer>
        <ShiftCarousel 
          selectedShiftIndex={selectedShiftIndex} 
          setSelectedShift={setSelectedShift} 
          shiftKeys={shiftKeys} />
      </DetailContainer>
      )
     } else {
       
       return (
         // "hello"
         <>
         <IndexContainer>
          <GridContainer gridArea={"columns"}  >

            <ShiftTable 
              
              shifts={stateShifts} 
              setSelectedShift={setSelectedShift} 
            />
          </GridContainer>
          <StyledButton 
            gridArea={"button"} 
            onClick={(e) => addNewShift()} >
            Add Shift
          </StyledButton>
         </IndexContainer>
          </>
       )

     }


  
} else { return ""}}





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