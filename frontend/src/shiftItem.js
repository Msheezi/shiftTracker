import React from 'react'
import styled from 'styled-components'

const Container = styled.ul`
    /*
    display: flex;
    z-index: 1;
    margin: 10px;
    box-sizing: border-box;
    
    */
    line-height: 50px;
    height: 50px;
     /* width: 90%;  */
    background-color: ${props => props.number % 2 == 0 ? "white" : "#D5E8EB"} ;
    overflow: hidden;
    border: 0.5px solid black;
    border-radius: 50px;
    list-style-type: none;
    padding: 0;
    position:relative;

    &:hover {
    border-color: #1e7e34;
    background-color: #FCDDBC;
}
    /* justify-content: space-around; */

/*  */

`
const MyDiv = styled.li`
/* text-align: center; */
/* line-height: 50px; */
/* height:50px; */
/* width: 100%; */
margin-left: 20px;
/* float: left; */
display: inline;


`


const Value = styled.li`

    margin-right: 10px;
    /* min-width: 200px; */
    /* width:80px; */
    /* line-height: 50px; */
    /* height:50px; */
/* float: left; */
    display: inline;
    
    


`
const Button = styled.div`
    border: none;
    background-color: ${props => props.status ? "#E23C4A" : "#A3CCA6"};
    border-radius: 5px;
    padding: 2px;
    /* width: 25px; */
    text-align:center;
    justify-self: flex-end;
    /* display: inline; */
    float: right;
    width: 90px;
    

`

const converDateString = (dateString) => {
     let [month, date, year] = (new Date(dateString).toLocaleDateString().split("/"))
    let [hour, minute, second] = (new Date(dateString).toLocaleTimeString().slice(0,7).split(":"))

     return `${month}/${date}/${year} ${hour}:${minute}`
}



export const ShiftItem = ({number, shift: {startDateTime, endDateTime, startMiles, endMiles, ttlMiles, tips = "0.00", ttlComp = "0.00", closed}}) => {
    
let start = converDateString(startDateTime)
let end = converDateString(endDateTime)
let shiftStatus = closed ? <Button status={closed}>Closed</Button> : <Button status={closed}>Edit</Button>

    return (
        <>
        <Container number={number}>
            <MyDiv> {number}.  </MyDiv>
            
                
            <Value>{`Shift Start: ${start}`}</Value>
            {/* <Value>{`Shift End: ${end}`}</Value> */}
            <Value>Starting Miles: {startMiles}</Value>
            <Value>Ending Miles: {endMiles}</Value>
            <Value>Total Miles: {ttlMiles}</Value>
            <Value>Tips: ${tips}</Value>
            <Value >Total Comp: ${ttlComp}</Value>
            {/* <Button>Shift Closed?: {closed.toString()}</Button> */}
            
           
                {shiftStatus}
        </Container>
                </>

    )


}