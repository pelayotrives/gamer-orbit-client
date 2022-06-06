import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from '../../context/auth.context'

function Profile() {

  const { user } = useContext(AuthContext)
  console.log(user);

  return (
    <div>
      <div>
        <h1>¡Bienvenid@ de nuevo, {user.username}!</h1>
        <h4>Tu username actual es {user.username}</h4>
        <h4>Tu email actual es {user.email}</h4>
        <button><NavLink to={`/profile/${user._id}/edit`}> Editar perfil </NavLink></button>
      </div>
    </div>
  )
}

export default Profile