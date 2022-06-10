import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupService } from '../../services/auth.services'

//! Boostrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

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
        <div className='authCard'>
          <br />  
          <h1>Sign Up</h1>
          <br />

          <Form className="container" onSubmit={handleSignUp}>

            <Form.Group className="mb-3 text-style" controlId="formBasicUsername">
              <Form.Label htmlFor="username">Username: </Form.Label>
              <Form.Control type="text" name='username' value={username} onChange={handleUsername}/>
            </Form.Group>  

            <Form.Group className="mb-3 text-style" controlId="formBasicEmail">
              <Form.Label htmlFor="email">Email: </Form.Label>
              <Form.Control type="email" name='email' value={email} onChange={handleEmail}/>
            </Form.Group>

            <Form.Group className="mb-3 text-style" controlId="formBasicPassword">
              <Form.Label htmlFor="password">Password: </Form.Label>
              <Form.Control type="password" name='password' value={password} onChange={handlePassword}/>
            </Form.Group>

            
              {/* Si el mensaje de error no es nulo, es que se ha seteado como que algo pasa a lo largo del código, y se mostraría aquí. */}
              { errorMessage !== null && <p className="required-alert">{errorMessage}</p>}
            

              <br />
              <Button variant="outline-dark" className="register-btn" type='submit'>Sign Up</Button>
              <br />

              <br />

            <Alert className="register-now-alert" variant={"secondary"}>
              <Link className="register-now-alert" to={"/login"}>Already registered? Log in!</Link>
            </Alert>

            <br/>
          </Form>
        </div>
    
    </div>
  )
}

export default Signup