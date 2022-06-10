import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listProfileService, profileEditService, uploadService } from '../../services/profile.services'

//! Boostrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function ProfileEdit() {

  const navigate = useNavigate()
  const {_id} = useParams()

  const [avatar, setAvatar] = useState() // poner una url a imagen estandar como estado inicial
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [birthday, setBirthday] = useState("")
  const [genre, setGenre] = useState("")
  const [aboutme, setAboutme] = useState("")


  const handleCityEdit = (event) => {
    console.log(event.target.value);
    setCity(event.target.value)
  }

  const handleCountryEdit = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value)
  }

  const handleAddressEdit = (event) => {
    console.log(event.target.value);
    setAddress(event.target.value)
  }

  const handleBirthdayEdit = (event) => {
    console.log(event.target.value);
    setBirthday(event.target.value)
  }

  const handleGenreEdit = (event) => {
    console.log(event.target.value);
    setGenre(event.target.value)
  }

  const handleAboutmeEdit = (event) => {
    console.log(event.target.value);
    setAboutme(event.target.value)
  }

  useEffect(() => {
    getUserData()
  })

  const getUserData = async () => {
    try {

      const response = await listProfileService()
      setAvatar(response.data.avatar)
      // setCity(response.data.city)
      // setCountry(response.data.country)
      // setAddress(response.data.address)
      // setBirthday(response.data.birthday)
      // setGenre(response.data.genre)
      // setAboutme(response.data.aboutme)

    }catch(error) {
      navigate("/error")
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault()
    console.log(event.target.value);

    const profile = {
      avatar,
      city,
      country,
      address,
      birthday,
      genre,
      aboutme
    }

    try {

      await profileEditService(_id, profile)
      navigate("/profile")

    }
    catch (error) {
      navigate("/error")
    }

  }

  useEffect(() => {
    getProfileDetails()
  }, [])

  const getProfileDetails = async () => {
    try {
      const response = await listProfileService(_id)
      const { avatar, city, country, address, birthday, genre, aboutme } = response.data
      setAvatar(avatar);
      setCity(city);
      setCountry(country);
      setAddress(address);
      setBirthday(birthday);
      setGenre(genre);
      setAboutme(aboutme);
      
    }
    catch (error) {
      navigate("/error")
    }
  }

  const handleImageChange = async (event) => {

    console.log(event.target.files[0])

    // tipo de formulario que ya viene preparado para la transferencia de archivos
    const uploadForm = new FormData()
    uploadForm.append("image", event.target.files[0])
    try {

      const response = await uploadService(uploadForm)
      setAvatar(response.data)


    } catch (error) {
      navigate("/error")
    }
  }

  return (

    <div>
    <br />
    <h1>Edit profile: </h1>
    <br />
      <Form className="container" onSubmit={handleEdit}>

        {/* <label htmlFor="avatar">Avatar: </label>
        <input type="file" name='avatar' value={avatar} onChange={handleAvatarEdit}/>
        <br /><br /> */}

        <Form.Group>
          <Form.Label htmlFor="city">City: </Form.Label>
          <Form.Control type="text" name='city' value={city} onChange={handleCityEdit} />
        </Form.Group>
        <br /><br />

        <Form.Group>
          <Form.Label htmlFor="country">Country: </Form.Label>
          <Form.Control type="text" name='country' value={country} onChange={handleCountryEdit}/>
        </Form.Group>
        <br /><br />

        <Form.Group>
          <Form.Label htmlFor="address">Address: </Form.Label>
          <Form.Control type="text" name='address' value={address} onChange={handleAddressEdit}/>
        </Form.Group>
        <br /><br />

        <Form.Group>
          <Form.Label htmlFor="birthdate">Birthday: </Form.Label>
          <Form.Control type="date" name='birthdate' value={birthday} onChange={handleBirthdayEdit}/>
        </Form.Group>
        <br /><br />

        <Form.Group>
          <Form.Label htmlFor="genre">Genre: </Form.Label>
          <Form.Control type="text" name='genre' value={genre} onChange={handleGenreEdit}/>
        </Form.Group>
        <br /><br />

        <Form.Group>
          <Form.Label htmlFor="aboutme">About me: </Form.Label>
          <Form.Control as="textarea" name='aboutme' rows={5} cols={40} value={aboutme} onChange={handleAboutmeEdit} />
        </Form.Group>
        <br /><br />

        <Form.Group>
          <Form.Label htmlFor="image">Picture</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>

        <img src={avatar} alt="profile-pic" width={200}/>
        
        <br /><br />

        <Button variant="outline-dark" className="register-btn" type='submit'>Editar</Button>

      </Form>
    </div>

  )
}

export default ProfileEdit