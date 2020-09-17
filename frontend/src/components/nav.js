import React from 'react'
import {Link} from 'react-router-dom'

import styled from 'styled-components'

const Container = styled.div`
    height: 50px;
    width: 100%;
    background-color: #C8E1E5;
    margin: 0;
    margin-bottom: 10px;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: flex;

`

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
            <Title>Shift Tracker</Title>
            {/* <Links to="/">Home</Links> */}
            {/* <Links to="/summary">Summary</Links> */}
        </Container>
    )
}

