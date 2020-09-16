import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
    line-height: 50px;
    height: 50px;
    background-color: ${props => props.number % 2 === 0 ? "#D5E8EB":"white"} ;
    overflow: hidden;
    border: 0.5px solid black;
    border-radius: 50px;
    list-style-type: none;
    padding: 0;
    position:relative;
    margin: 10px auto;
    

    &:hover {
    border-color: #1e7e34;
    background-color: #FCDDBC;
    cursor: pointer;
}


`
const MyDiv = styled.div`
margin-left: 20px;
/* display: inline; */


`


const Value = styled.div`

    margin-right: 10px;
    display: inline;
    

`
const Button = styled.div`
    border: 0.5px solid black;
    background-color: ${props => props.status ? "#E23C4A" : "#A3CCA6"};
    border-radius: 5px;
    padding: 5px;
    /* width: 25px; */
    text-align:center;
    margin: 0 auto;
    /* justify-self: flex-end; */
    /* display: inline; */
    /* float: right; */
    width: 60px;
    /* z-index: 1; */
    /* overflow: hidden; */
    box-sizing: border-box;
    position: absolute;
    right: 15px;
    top: 10px;
    height: 25px;
    line-height: 20px;
    
    

`

const converDateString = (dateString) => {
     let [month, date, year] = (new Date(dateString).toLocaleDateString().split("/"))
    let [hour, minute, ] = (new Date(dateString).toLocaleTimeString().slice(0,7).split(":"))

     return `${month}/${date}/${year} ${hour}:${minute}`
}



export const ShiftItem = ({number, setSelectedShift, shift: {_id, startDateTime, endDateTime, startMiles, endMiles, ttlMiles, tips = 0, ttlComp = 0, closed}}) => {
    
let start = converDateString(startDateTime)
let end = endDateTime ?  converDateString(endDateTime) : "00:00"
let shiftStatus = closed ? <Button status={closed}>Closed</Button> : <Button status={closed}>Edit</Button>

    return (
    //    <Link style={{textDecoration: "none", color: "black"}} to={`shift/${_id}`}>
           
        <Container number={number} onClick={()=>setSelectedShift(_id)}>
            <MyDiv> {`${ number + 1}.  `} 
            <Value>{`Shift Start: ${start}`}</Value>
            <Value>{`Shift End: ${end}`}</Value>
            {/* <Value>Starting Miles: {startMiles}</Value>
            <Value>Ending Miles: {endMiles}</Value> */}
            <Value>Total Miles: {ttlMiles}</Value>
            <Value>{`Tips: $${tips.toFixed(2)}`}</Value>
            <Value >Total Comp: ${ttlComp}</Value>
            </MyDiv>
            {shiftStatus}
        </Container>

    //    </Link>
                

    )


}