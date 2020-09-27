import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  border: 0.5px solid lightgray;
  /* height: 60vh; */
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  text-align: center;
  box-shadow: -2px -1px 2px lightgray, 2px 2px 2px lightgray;
  margin-right: 20px;
`;

const MetricItem = styled.div`
  font-size: 12pt;
  font-family: Roboto;
  height: 50px;
  border-radius: 10px;
  line-height: 50px;
  border: 0.25px solid white;
  /* border-color: #1e7e34; */
  margin: 5px;
  box-shadow: -2px -1px 2px lightgray, 2px 2px 2px lightgray;
  &:hover {
    border: 0.25px solid blue;
    border-color: #1e7e34;
    /* background-color: #FCDDBC; */
    cursor: pointer;
    /* transition-duration: 0.4s;
    transform: scale(1.02); */
  }
`;

const StyledHeader = styled.h3`
  color: dimgray;
  font-family: Roboto;
  font-size: 14pt;
  text-align: center;
  font-weight: bold;
`;

export const Metrics = ({ shiftTotals }) => {
  const { duration, tips, ttlComp, ttlMiles } = shiftTotals;

  return (
    <Container>
      <StyledHeader>Shift Metrics</StyledHeader>
      <MetricItem>{`Miles Driven: ${ttlMiles}`}</MetricItem>
      <MetricItem>{`Hours Worked: ${duration.toFixed(2)}`}</MetricItem>
      <MetricItem>{`Tips Collected: ${tips.toFixed(2)}`}</MetricItem>
      <MetricItem>{`Est. Earnings: $ ${ttlComp}`}</MetricItem>
      <p>
        *Totals only include <strong>Closed</strong> shifts
      </p>
    </Container>
  );
};
