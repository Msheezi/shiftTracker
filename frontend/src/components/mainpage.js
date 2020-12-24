import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'



const Card = styled.div`
    width: 300px;
    height: 300px;
    /* border: 0.5px solid black; */
    margin: auto;
    text-align: center;

`

const useStyles = makeStyles({
  container: {
    width: "80vw",
    margin: "50px auto",
    textAlign: "center"

  }
})



export const MainPage = ()=>{
  const classes = useStyles()
    return (

      <Grid container className={classes.container} alignItems={"center"}  >
        
        <Grid item xs={12} >

        <Link to="/shifts">
          Shifts{" "}
          <Card
            style={{
              backgroundImage: "url(shifts2.jpg)",
              objectFit: "scale-down",
            }}
            >
            {" "}
          </Card>
        </Link>
            </Grid>

            <Grid item xs={12}>

        <Link to="/summary">
          Summary<Card style={{ backgroundImage: "url(summary.jpg)" }}>

         </Card>
        </Link>
            </Grid>
            
      </Grid>
    );
}

