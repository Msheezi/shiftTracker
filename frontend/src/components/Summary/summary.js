import React, { useEffect, useState } from "react";
import { searchResults, keyShifts } from "../../functionhelpers";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ShiftsPage } from "../ShiftIndex/shiftsMain";
import { Metrics } from "./summaryMetrics";

const Container = styled.div`
  /* margin-top: 100px; */
  display: grid;
  grid-template-areas:
    ". header  header ."
    ". shifts  rangeSummary .";
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
`;

export const Summary = () => {
  //display blanks update values after entering in the starting and ending dates

  const [summaryState, setSummaryState] = useState();
  const [startDate, setStartDate] = useState({ start: "" });
  const [endDate, setEndDate] = useState({ end: "" });
  const [displayMetrics, setDisplayMetrics] = useState(true);

  const search = async () => {
    if (startDate && endDate) {
      let data = await searchResults(startDate, endDate);
      setSummaryState(data.data);
    }
  };

  const handleClose = () => {
    setDisplayMetrics(true);
  };

  const hideMetrics = () => {
    setDisplayMetrics(false);
  };

  let keyedShifts = summaryState ? keyShifts(summaryState.shifts) : "";

  let metrics =
    summaryState && displayMetrics ? (
      <Metrics shiftTotals={summaryState.shiftTotals} />
    ) : (
      ""
    );
  let shifts = summaryState ? (
    <ShiftsPage
      shifts={keyedShifts}
      location={true}
      handleClose={handleClose}
      hideMetrics={hideMetrics}
    />
  ) : (
    ""
  );

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

      <div style={{ gridArea: "shifts" }}>{shifts}</div>
      <div style={{ gridArea: "rangeSummary", marginTop: "55px" }}>
        <div>{metrics}</div>
      </div>
    </Container>
  );
};
