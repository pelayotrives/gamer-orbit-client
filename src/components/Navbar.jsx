import React from 'react'
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div>
    
    <NavLink to={"/"}> Home </NavLink>
    <NavLink to={"/videogames"}> Videogames </NavLink>
    <NavLink to={"/profile"}> Profile </NavLink>
    <NavLink to={"/collections"}> Collections </NavLink>
    <NavLink to={"/signup"}> Sign Up </NavLink>
    <NavLink to={"/login"}> Log In </NavLink>
    <NavLink to={"/logout"}> Log Out </NavLink>

    </div>
  )
}

export default Navbar