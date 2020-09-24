
import React from 'react'


export const Metrics = ({shiftTotals}) => {
    const {duration, tips, ttlComp, ttlMiles} = shiftTotals

    return (
        <>
        Search Highlights
    <div>{`Hours Worked: ${duration}`}</div>
    <div>{`Tips: ${tips}`}</div>
    <div>{`Miles: ${ttlMiles}`}</div>
    <div>{`Earnings: ${ttlComp}`}</div>
    <p>*Totals only include <strong>Closed</strong> shifts</p>
       </>
    )


}