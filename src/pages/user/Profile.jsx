import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { listProfileService } from '../../services/profile.services'
import { PulseLoader } from 'react-spinners/PulseLoader'

function Profile() {

  const {_id} = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState("")

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const response = await listProfileService(_id)
      setUser(response.data)
      console.log(response.data);
    }
    catch (error) {
      navigate("/error")
    }
  }

  if (user === null) {
    return (
      <>
      <h4>Cargando...</h4>
      <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  }

  return (
    <div>
      <div>
        <h1>¡Bienvenid@ de nuevo, {user.username}!</h1>
        <h4>Tu username actual es {user.username}</h4>
        <h4>Tu email actual es {user.email}</h4>
        <h6>Sobre mi: {user.aboutme}</h6>
        <button><NavLink to={`/profile/${user._id}/edit`}> Editar perfil </NavLink></button>
      </div>
    </div>
  )
}

export default Profile