import React, {useState} from 'react'
import {searchResults } from '../../functionhelpers'
import {ShiftItem} from '../ShiftIndex/shiftItem'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 50px;
`;


export const Summary = ()=>{
    //display blanks update values after entering in the starting and ending dates

    // const{shifts, shiftTotals} = apiresonse
    const [summaryState, setSummaryState] = useState()

    
    const search = async (start, end) => {
        let data = await searchResults(start,end)
        setSummaryState(data.data)
        
    }
    let values
    if (summaryState){
        values = summaryState.shifts.map((shiftObj, idx) => (
        <ShiftItem
          key={shiftObj._id}
          shift={shiftObj}
          number={idx}
        //   setSelectedShift={setSelectedShift}
        />
      ))
      .reverse();
  } else {
    values = null;
    }

    return (
      <Container>
        <div>Summary Route</div>
        <button onClick={() => search("09/15/2020", "09/18/2020")}>Test</button>
        {values}
        {/* // <ShiftList shifts={shifts}/>
        // <ShiftSummary shiftTotals={shiftTotals} */}
      </Container>
    );
}