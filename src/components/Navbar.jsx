import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from '../context/auth.context'

function Navbar() {

  const { isLoggedIn, user } = useContext(AuthContext)

  return (
    <div>

    { user !== null && <p>Bienvenido: {user.username}</p>}

    { isLoggedIn === true ? (
      <nav>
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/videogames"}> Videogames </NavLink>
        <NavLink to={"/profile"}> Profile </NavLink>
        <NavLink to={"/collections"}> Collections </NavLink>
        <NavLink to={"/logout"}> Log Out </NavLink>
      </nav>
    ) : (
      <nav>
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/videogames"}> Videogames </NavLink>
        <NavLink to={"/signup"}> Sign Up </NavLink>
        <NavLink to={"/login"}> Log In </NavLink>
      </nav>
    )} 
    
    </div>
  )
}

export default Navbar