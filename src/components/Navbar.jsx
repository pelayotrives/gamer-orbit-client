import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context'

function Navbar() {

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
      <nav>
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/videogames"}> Videogames </NavLink>
        <NavLink to={"/profile"}> Profile </NavLink>
        <NavLink to={"videogames/:id/collections"}> Collections </NavLink>
        <button onClick={handleLogout}> Log Out </button>
        <br /><br />
      </nav>
    ) : (
      <nav>
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/videogames"}> Videogames </NavLink>
        <NavLink to={"/signup"}> Sign Up </NavLink>
        <NavLink to={"/login"}> Log In </NavLink>
        <br /><br />
      </nav>
    )} 
    
    </div>
  )
}

export default Navbar