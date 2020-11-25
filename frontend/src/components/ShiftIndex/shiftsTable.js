
import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { ShiftItem } from "./shiftItemTable";

const converDateString = (dateString, time) => {
  let [month, date, year] = new Date(dateString)
    .toLocaleDateString()
    .split("/");
  let [hour, minute] = new Date(dateString)
    .toLocaleTimeString()
    .slice(0, 7)
    .split(":");
  if(time){
    return `${hour}:${minute}`
  } else {
    // return `${month}/${date}/${year} ${hour}:${minute}`;
    return `${month}/${date}/${year}`;

  }
};

//shifts is an array of objects
export const ShiftTable = ({shifts, setSelectedShift}) => {
    
   
       let shiftObjects = Object.values(shifts).map(({startDateTime,endDateTime, shiftDuration, ttlMiles, ttlComp,_id}, idx )=> {
        
        let startDate = converDateString(startDateTime)
        let start = converDateString(startDateTime, "true");
        let end = endDateTime ? converDateString(endDateTime, "true") : "00:00";


            return (
                
            <TableRow key={_id} onClick={()=> setSelectedShift(_id) }>
                <TableCell component="th" scope="row">{startDate}</TableCell>
                <TableCell align="center">{shiftDuration || 0.00}</TableCell>
                <TableCell align="center">{ttlMiles}</TableCell>
                <TableCell align="center">{`$ ${ttlComp}`}</TableCell>
            </TableRow>
                )
                
            })
        const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

    const classes = useStyles()
   

   
return (
    
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell >Date</TableCell>
                    <TableCell align="center" >Hours</TableCell>
                    <TableCell align="center">Miles</TableCell>
                    <TableCell  align="center">Earnings</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {shiftObjects.reverse()}
                </TableBody>
            </Table>
        </TableContainer>
    
    ) 
}



//<div style={{width: "800px", margin: "50px auto"}}></div>