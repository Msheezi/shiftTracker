import React from 'react'


export const ShiftDisplay = ({shiftObj})=> {
   
    if (shiftObj) {

        
        const { 
            startDateTime, endDateTime, 
            startMiles, endMiles, ttlMiles, 
            tips = 0, ttlComp = 0, closed } = shiftObj
            
            console.log(`shiftObj: ${shiftObj}`)
            
            
            return (
                <>
    <div>{startDateTime}</div>
    <div>{endDateTime}</div>
    <div>{startMiles}</div>
    <div>{endMiles}</div>
    <div>{ttlMiles}</div>
    <div>{tips}</div>
    <div>{ttlComp}</div>
    <div>{closed}</div>
    <div>{startDateTime}</div>
    <div>{startDateTime}</div>
    
    </>


)
} else {
    return null
}
}

