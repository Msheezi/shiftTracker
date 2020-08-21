import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

    height: 50px;
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
/*  */

`

const Value = styled.span`

    margin: 5px;

`

export const ShiftItem = ({shift, shift: {startDateTime, endDateTime, startMiles, endMiles, ttlMiles, tips, ttleComp, closed}}) => {
    

    return (
        <Container>
            <ol> 
            <Value>Shift Start: {startDateTime}</Value>
            <Value>Shift End{endDateTime}</Value>
            <Value>Starting Miles: {startMiles}</Value>
            <Value>Ending Miles: {endMiles}</Value>
            <Value>Total Miles: {ttlMiles}</Value>
            <Value>Tips: {tips}</Value>
            <Value>Total Comp: {ttleComp}</Value>
            <Value>Shift Closed?: {closed.toString()}</Value>
            </ol>
        </Container>

    )


}