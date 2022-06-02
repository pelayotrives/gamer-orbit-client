import React from 'react'

function Login() {
  return (
    <div>

        <h1>Log In</h1>

        <form>

            <label htmlFor="username">Username: </label>
            <input type="text" name='username'/>

            <label htmlFor="password">Password: </label>
            <input type="password" name='password'/>

            <button type='submit'>Log In</button>

        </form>
    
    </div>
  )
}

export default Login