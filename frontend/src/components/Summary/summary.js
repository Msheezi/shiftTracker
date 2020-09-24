import React, {useState} from 'react'
import {searchResults } from '../../functionhelpers'
import {ShiftItem} from '../ShiftIndex/shiftItem'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ShiftsPage } from '../ShiftIndex/shiftsMain';
import {Metrics} from './summaryMetrics'


const Container = styled.div`
  /* margin-top: 100px; */
  display: grid;
  grid-template-areas:
    ". header  header ."
    ". shifts  rangeSummary .";
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;


export const Summary = ()=>{
    //display blanks update values after entering in the starting and ending dates

    // const{shifts, shiftTotals} = apiresonse
    const [summaryState, setSummaryState] = useState()
    const [startDate, setStartDate] = useState({start: ""})
    const [endDate, setEndDate] = useState({end: ""})
    
    const search = async () => {
      if(startDate && endDate) {

        let data = await searchResults(startDate,endDate)
        setSummaryState(data.data)
      }
        
    }

    let metrics = summaryState ? <Metrics shiftTotals={summaryState.shiftTotals} /> : ""
  
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

        <div style={{ gridArea: "shifts" }}>
          {summaryState ? (
            <ShiftsPage shifts={summaryState.shifts} location={"true"} />
          ) : ("")}
        </div>
        <div style={{ gridArea: "rangeSummary" , marginTop: "55px"}}>
          
          <div>
            {metrics}
          </div>
        </div>
      </Container>
    );
}