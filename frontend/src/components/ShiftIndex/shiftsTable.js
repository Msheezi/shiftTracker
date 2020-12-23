
import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'
// import Grid from '@material-ui/core/Grid'
import { TableFooter } from '@material-ui/core';



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

// const columns =[
//   {field: 'startDate', headerName: "Date", width: "20%" },
//   {field: 'shiftDuration', headerName: "Hours",width: "20%" },
//   {field: 'ttlMiles', headerName: "Miles", width: "20%" },
//   {field: 'ttlComp', headerName: "Earnings", width: "20%" }
// ]


//shifts is an array of objects
export const ShiftTable = ({shifts, setSelectedShift}) => {
  const [page, setPage] = useState(0)
  const [displayRows, setDisplayRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)


    useEffect(()=>{
      let startingIndex = page * rowsPerPage
      let selectedObjects = Object.values(shifts).reverse().slice(startingIndex,startingIndex+rowsPerPage)
      setDisplayRows(selectedObjects)

    },[page, rowsPerPage, shifts ])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      let count = Object.values(shifts).length
    
       let shiftObjects = displayRows.map(({startDateTime,endDateTime, shiftDuration, ttlMiles, ttlComp,_id}, idx )=> {
        
        let startDate = converDateString(startDateTime)
        // let start = converDateString(startDateTime, "true");
        // let end = endDateTime ? converDateString(endDateTime, "true") : "00:00";


            return (
                
            <TableRow key={_id} onClick={()=> setSelectedShift(_id)} style={{cursor: "pointer"}}>
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
          pageContainer: {
            // width: "100vw",
            maxWidth: "800px",
            minWidth: "200px"
          }
        });

    const classes = useStyles()
   

   
return (
      <div >

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
                    {shiftObjects}
                </TableBody>
                <TableFooter>
                  <TableRow>
                  </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
                    <TablePagination
                      component="div"
                      count={count}
                      colSpan={4}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      rowsPerPage={rowsPerPage}
                      />
        </div>
        
    
    ) 
}



//<div style={{width: "800px", margin: "50px auto"}}></div>