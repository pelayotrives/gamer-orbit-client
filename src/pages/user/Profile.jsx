import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { listProfileService, profileDeleteService } from '../../services/profile.services'
import { PulseLoader } from 'react-spinners/PulseLoader'
import {AuthContext} from "../../context/auth.context.js"

//! Boostrap
import Button from 'react-bootstrap/Button';


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
      <div className='authCard' id='authCard-profile'>
        <br />
        <h1>¡Welcome again!</h1>
        <br />
        <img src="http://via.placeholder.com/150x150" alt="Placeholder" />
        {/* <img src={user.avatar} alt="user pic" width={300} /> */}
        <br /><br />
        <h6>Your username is <strong>{user.username}</strong></h6>
        <h6>Your email is <strong>{user.email}</strong></h6>
        <h6>City: <strong>{user.city}</strong></h6>
        <h6>Country: <strong>{user.country}</strong></h6>
        <h6>Genre: <strong>{user.genre}</strong></h6>
        <h6>Address: <strong>{user.address}</strong></h6>
        <h6>About me: <strong>{user.aboutme}</strong></h6>
        <br />
        <div className='welcome-buttons'>
          <Button variant="outline-dark" id="register-margin-button" className="register-btn"><Link className='button-link' to={`/profile/${user._id}/edit`}> Edit profile </Link></Button>
          <Button variant="outline-dark" className="register-btn" onClick={handleDelete}> Delete profile </Button>
        </div>
        <br/><br/>
      </div>
    </div>
  )
}

export default Profile