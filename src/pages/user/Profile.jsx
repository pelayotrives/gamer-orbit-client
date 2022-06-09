import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { listProfileService, profileDeleteService } from '../../services/profile.services'
import { PulseLoader } from 'react-spinners/PulseLoader'
import {AuthContext} from "../../context/auth.context.js"

function Profile() {

  const {_id} = useParams()
  const navigate = useNavigate()

  const {authenticateUser} = useContext(AuthContext)

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
      <h4>Loading...</h4>
      <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  }

  //! ******** Handle del delete del profile ********

  const handleDelete = async () => {

    try {
      await profileDeleteService(_id)
      localStorage.removeItem("authToken")
      // es importante invocar de nuevo la funciona de authenticate cuando borras un usuario. Para que después compruebe que el usuario ya no está autenticado.
      authenticateUser()
      navigate("/")
    }
    catch (error) {
      navigate("/error")
    }

  }

  //! ******** ------------------------------ ********


  return (
    <div>
      <div>
        <br />
        <h1>¡Welcome again!</h1>
        <br />
        <img src={user.avatar} alt="user pic" width={300} />
        <br />
        <h4>Your username is {user.username}</h4>
        <h4>Your email is {user.email}</h4>
        <h5>City: {user.city}</h5>
        <h5>Country: {user.country}</h5>
        <h5>Genre: {user.genre}</h5>
        <h5>Address: {user.address}</h5>
        <h5>About me: {user.aboutme}</h5>
        <button><Link to={`/profile/${user._id}/edit`}> Edit profile </Link></button>
        <button onClick={handleDelete}> Delete profile </button>
      </div>
    </div>
  )
}

export default Profile