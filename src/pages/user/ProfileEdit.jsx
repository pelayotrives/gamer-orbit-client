import React from 'react'

function ProfileEdit() {
  return (

    <div>
    <h1>Editar perfil: </h1>
    <br />
      <form>

        <label htmlFor="username">Username: </label>
        <input type="text" name='username' />

        <label htmlFor="avatar">Avatar: </label>
        <input type="file" name='avatar' />

        <label htmlFor="city">Ciudad: </label>
        <input type="text" name='city' />

        <label htmlFor="country">País: </label>
        <input type="text" name='country' />

        <label htmlFor="address">Dirección: </label>
        <input type="address" name='address' />

        <label htmlFor="birthdate">Cumpleaños: </label>
        <input type="date" name='birthdate' />

        <label htmlFor="address">Dirección: </label>
        <input type="address" name='address' />

      </form>
    </div>

  )
}

export default ProfileEdit