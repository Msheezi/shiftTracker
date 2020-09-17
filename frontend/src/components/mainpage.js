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

`



export const MainPage = ()=>{

    return (
      <Container>
        <Card>
          <Link to="/shifts">Shifts </Link>
        </Card>
        <Card style={{ backgroundImage: "url(summary.jpg)" }}>
          <Link to="/summary">Summary</Link>
        </Card>
      </Container>
    );
}

