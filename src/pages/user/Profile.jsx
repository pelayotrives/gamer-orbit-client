import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
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
        <h1>¡Welcome again!</h1>
        <h4>Your username is {user.username}</h4>
        <h4>Your email is {user.email}</h4>
        <h5>City: {user.city}</h5>
        <h5>Country: {user.country}</h5>
        <h5>Genre: {user.genre}</h5>
        <h5>Address: {user.address}</h5>
        <h5>About me: {user.aboutme}</h5>
        <button><Link to={`/profile/${user._id}/edit`}> Edit profile </Link></button>
        <button> Delete profile </button>
      </div>
    </div>
  )
}

export default Profile