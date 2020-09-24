import React, {useState} from 'react'
import {searchResults } from '../../functionhelpers'
import {ShiftItem} from '../ShiftIndex/shiftItem'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ShiftsPage } from '../ShiftIndex/shiftsMain';


const Container = styled.div`
  /* margin-top: 100px; */
  display: grid;
  grid-template-areas:
    "header header . rangeSummary"
    "shifts shifts . rangeSummary";
    grid-template-columns: 2fr 2fr 1fr;
`;


export const Summary = ()=>{
    //display blanks update values after entering in the starting and ending dates

    // const{shifts, shiftTotals} = apiresonse
    const [summaryState, setSummaryState] = useState()
    const [startDate, setStartDate] = useState({start: ""})
    const [endDate, setEndDate] = useState({end: ""})
    const [selectedShift, setSelectedShift] = useState(null)

    // const handleDateEntry = (e, date) => {
    //   debugger
    //   let newDates = {...searchDates}
    //   newDates[e.target.id] = date
    //   debugger;

    //   setSearchDates(newDates)
    // }

    
    const search = async () => {
      if(startDate && endDate) {

        let data = await searchResults(startDate,endDate)
        setSummaryState(data.data)
      }
        
    }
    let values
    if (summaryState){
        values = summaryState.shifts.map((shiftObj, idx) => (
        <ShiftItem
          key={shiftObj._id}
          shift={shiftObj}
          number={idx}
          setSelectedShift={setSelectedShift}
        />
      ))
      
  } else {
    values = null;
    }

    return (
      <Container>
        <div style={{ gridArea: "header" }}>
          <DatePicker
            id="start"
            onChange={(date) => setStartDate(date)}
            selected={Date.parse(startDate)}
          />

          <DatePicker
            id="end"
            onChange={(date) => setEndDate(date)}
            selected={Date.parse(endDate)}
          />
        <button onClick={search}>Get Shifts</button>
        </div>
        <div>Summary Route</div>
        <div style={{gridArea: "shifts"}}>

        {summaryState ? <ShiftsPage shifts={summaryState.shifts} location={"true"}/>: ""}
        </div>
        {/* // <ShiftList shifts={shifts}/>
        // <ShiftSummary shiftTotals={shiftTotals} */}
      </Container>
    );
}