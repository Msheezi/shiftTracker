import React from 'react'
import {Link} from 'react-router-dom'

import styled from 'styled-components'

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #5eadfd;
  /* margin-left: 20px; */
  margin-bottom: 40px;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  /* justify-content: center; */
  box-shadow: 2px 2px 2px lightgray;
  position: fixed;
  top: 0;
  z-index: 1;
   text-align: center;
   justify-content:center;

`;

const Title = styled.h2`
    text-align: center;
    margin: 5px auto;
`

const Links = styled(Link)`
    align-self: center;
    justify-self: center;
    margin-right: 5px;
    margin-left: 20px;
    text-decoration: none;
    text-align: center;
    color: navajowhite;

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

