import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context'

import logo from "../img/gamerorbit-logo.png"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


function MyNavbar() {

  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser()
    // Para cuando haga logout, que se salga de la página de perfil.
    navigate("/")
  }

  return (
    <div>

    {/* { user !== null && <p>Bienvenido: {user.username}</p>} */}

    { isLoggedIn === true ? (
      <div id="nav-div">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="nav-container">
      
      <img src={logo} alt="logo" />
        {/* <Navbar.Brand as={NavLink} to={"/"}> Home </Navbar.Brand> */}
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to={"/"}> Home </Nav.Link>
            <Nav.Link as={NavLink} to={"/videogames"} end={true}> Videogames </Nav.Link>
            <Nav.Link as={NavLink} to={"/profile"}> Profile </Nav.Link>
            <Nav.Link as={NavLink} to={"/profile/collections"} end={true}> Collections </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}> Log Out </Nav.Link>
          </Nav>
        
          
        </Navbar.Collapse>
        
      </Container>
      </Navbar>
      </div>
    ) : (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="nav-container">
      <img src={logo} alt="logo" />
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to={"/"}> Home </Nav.Link>
        <Nav.Link as={NavLink} to={"/videogames"}> Videogames </Nav.Link>
        </Nav>
        <Nav>
        <Nav.Link as={NavLink} to={"/signup"}> Sign Up </Nav.Link>
        <Nav.Link as={NavLink} to={"/login"}> Log In </Nav.Link>
        </Nav>
        
        </Navbar.Collapse>
      </Container>
      </Navbar>
    )} 
    
    </div>
  )
}

export default MyNavbar