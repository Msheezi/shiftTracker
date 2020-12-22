import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const Container = styled.div`

    width: 80%;
    margin: 200px auto;
    display: flex;
    justify-content: space-around;

`

const Card = styled.div`
    width: 300px;
    height: 300px;
    /* border: 0.5px solid black; */
    margin: auto;
    text-align: center;

`

const useStyles = makeStyles({
  root: {
    width: "80vw",
    margin: "200px auto"

  }
})



export const MainPage = ()=>{
  const classes = useStyles()
    return (

      <Grid container alignItems={"center"}  >
        <Grid item xs={2}></Grid>
        <Grid item xs={4} >

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

            <Grid item xs={4}>

        <Link to="/summary">
          Summary<Card style={{ backgroundImage: "url(summary.jpg)" }}>

         </Card>
        </Link>
            </Grid>
            <Grid item xs={2}></Grid>
      </Grid>
    );
}

