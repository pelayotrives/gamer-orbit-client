import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from '../context/auth.context'

function Navbar() {

  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser()
  }

  return (
    <div>

    { user !== null && <p>Bienvenido: {user.username}</p>}

    { isLoggedIn === true ? (
      <nav>
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/videogames"}> Videogames </NavLink>
        <NavLink to={"/profile"}> Profile </NavLink>
        <NavLink to={"/collections"}> Collections </NavLink>
        <button onClick={handleLogout}> Log Out </button>
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