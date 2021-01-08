import React, {useState, useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'



export const Metrics = ({shifts})=> {

/**
 * get totals for selected shift range
 * gotta be a better way to do this one...
 */
    const totals = {}
   shifts.forEach(({shiftDuration, tips, ttlMiles, ttlComp}) => {
       totals.duration ? totals.duration += parseFloat(shiftDuration) : totals.duration = parseFloat(shiftDuration)
        totals.miles ? totals.miles += ttlMiles : totals.miles = ttlMiles
        totals.tips ? totals.tips += tips : totals.tips = tips
        totals.totalComp ? totals.totalComp += parseFloat(ttlComp) : totals.totalComp = parseFloat(ttlComp)
   
    })

    
    


    

    return (
        <div>Shift Totals
            <p>{`Hours: ${totals.duration}`}</p>
            <p>{`Miles: ${totals.miles}`}</p>
            <p>{`Tips: ${totals.tips}`}</p>
            <p>{`Total Comp: ${totals.totalComp}`}</p>
            
        </div>

    )
    /**
     * display total miles
     * total earnings
     * total tips
     * total hours
     */



}