import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

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



export const MainPage = ()=>{

    return (
      <Container>
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

        <Link to="/summary">
          Summary<Card style={{ backgroundImage: "url(summary.jpg)" }}>

         </Card>
        </Link>
      </Container>
    );
}

