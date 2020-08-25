import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import styled from 'styled-components'
import axios from 'axios'




const ShiftDetail =  (props) => {
    const [shift, updateShift] = useState(null)
    const shiftId = props.match.params.shiftId

    useEffect(()=>{
        //  axios.get(`/shifts/${shiftId}`).then(res => updateShift(res.data))
         axios
           .get(`/shifts/${shiftId}`)
           .then((res) => updateShift(res.data))
           .catch(err => {
               console.log(`error:` + err)
           })
    }, [shiftId])

    return shift ? <div>{shift.startDateTime}</div> : null
  
    
};

export default withRouter(ShiftDetail)