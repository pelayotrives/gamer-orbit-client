import React from 'react'

function Signup() {
  return (
    <div>

        <h1>Sign Up</h1>

        <form>

            <label htmlFor="username">Username: </label>
            <input type="text" name='username'/>

            <label htmlFor="email">Email: </label>
            <input type="email" name='email'/>

            <label htmlFor="password">Password: </label>
            <input type="password" name='password'/>

            <button type='submit'>Sign Up</button>

        </form>
    
    </div>
  )
}

export default Signup