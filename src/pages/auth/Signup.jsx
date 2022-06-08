import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupService } from '../../services/auth.services'

function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const handleUsername = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value)
  }

  const handleEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value)
  }

  const handleSignUp = async (event) => {
    event.preventDefault()

    const newUser = {
      username,
      email,
      password
    }

    try {
      //! Esto sería como llamar a http://localhost:5005/api/auth/signup y pasarle el objeto usuario que acabamos de crear.
      await signupService(newUser)
      console.log("Usuario registrado.");
      navigate("/login")
    }
    catch (error) {
      console.log(error.response.data.errorMessage);
      // Si el error es 400...
      if (error.response.status === 400) {
        // ...Actualizamos el estado con ese error
        setErrorMessage(error.response.data.errorMessage) 
      } else {
        // Si no es 400, redirijimos directamente a error.
        navigate("/error")
      }
    }

  }
  

  return (
    <div>

        <h1>Sign Up</h1>

        <form onSubmit={handleSignUp}>

            <label htmlFor="username">Username: </label>
            <input type="text" name='username' value={username} onChange={handleUsername}/>

            <label htmlFor="email">Email: </label>
            <input type="email" name='email' value={email} onChange={handleEmail}/>

            <label htmlFor="password">Password: </label>
            <input type="password" name='password' value={password} onChange={handlePassword}/>

            <button type='submit'>Sign Up</button>

            <br />

            <Link to={"/login"}>Already registered? Log in!</Link>

            <br /><br />
  
            {/* Si el mensaje de error no es nulo, es que se ha seteado como que algo pasa a lo largo del código, y se mostraría aquí. */}
            { errorMessage !== null && <p>{errorMessage}</p> }

        </form>
    
    </div>
  )
}

export default Signup