import React from 'react'
import {Link} from 'react-router-dom'

import styled from 'styled-components'

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #5eadfd;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 2px lightgray;
`;

const Title = styled.h2`
    align-self: center;
    margin: 5px auto;
`

const Links = styled(Link)`
    align-self: center;
    justify-self: center;
    margin-right: 5px;
    text-decoration: none;
    color: black;

`

export const Navbar = () => {


    return (


        <Container>
            <Links to='/'><Title>Shift Tracker</Title></Links>
            {/* <Links to="/">Home</Links> */}
            {/* <Links to="/summary">Summary</Links> */}
        </Container>
    )
}

