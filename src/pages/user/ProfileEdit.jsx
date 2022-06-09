import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listProfileService, profileEditService, uploadService } from '../../services/profile.services'

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
    <h1>Editar perfil: </h1>
    <br />
      <form onSubmit={handleEdit}>

        {/* <label htmlFor="avatar">Avatar: </label>
        <input type="file" name='avatar' value={avatar} onChange={handleAvatarEdit}/>
        <br /><br /> */}

        <label htmlFor="city">Ciudad: </label>
        <input type="text" name='city' value={city} onChange={handleCityEdit}/>
        <br /><br />

        <label htmlFor="country">País: </label>
        <input type="text" name='country' value={country} onChange={handleCountryEdit}/>
        <br /><br />

        <label htmlFor="address">Dirección: </label>
        <input type="text" name='address' value={address} onChange={handleAddressEdit}/>
        <br /><br />

        <label htmlFor="birthdate">Cumpleaños: </label>
        <input type="date" name='birthdate' value={birthday} onChange={handleBirthdayEdit}/>
        <br /><br />

        <label htmlFor="genre">Género: </label>
        <input type="text" name='genre' value={genre} onChange={handleGenreEdit}/>
        <br /><br />

        <label htmlFor="aboutme">About me: </label>
        <textarea name='aboutme' rows={10} cols={40} value={aboutme} onChange={handleAboutmeEdit}></textarea>
        <br /><br />

        <label htmlFor="image">Imagen</label>
        <input type="file" name="image" onChange={handleImageChange} />

        <img src={avatar} alt="profile-pic" width={200}/>

        <button type='submit'>Editar</button>

      </form>
    </div>

  )
}

export default ProfileEdit