import { useState, useContext } from "react";
import { loginService } from "../../services/auth.services";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate()

  const handleUsername = (event) => {
      console.log(event.target.value);
      setUsername(event.target.value)
    }

    const handlePassword = (event) => {
      // -----------> console.log(event.target.value);
      // -----------> setPassword(event.target.value)
    }


  const handleLogin = async (event) => {
    event.preventDefault();
    const user = { 
      username,
      password }

      try {
        // validaremos al usuario
        const response = await loginService(user)
        // console.log("usuario validado", response.data)
        // guardamos el token en localStorage
        // localStorage es el lugar local donde se guarda la informacion y setItem el método interno para acceder al localStorage y guardar información.
        localStorage.setItem("authToken", response.data.authToken)
        // después de retornar el isLoggedIn en auth.context.js hay que ponerle un await  a authenticateUser()
        await authenticateUser()
        //asignar los valores a los estados globales para manejo en 
        navigate("/profile")

      } catch (error) {

        if (error.response.status === 400 || error.response.status === 401) {
          setErrorMessage(error.response.data.errorMessage)
        } else {
          // navigate
          navigate("/error")
        }
      }
  };

  return (
    <div>
    <div className='authCard-login'>
      <br />
      <h1>Log In</h1>
      <br />

      <Form className="container" onSubmit={handleLogin}>

      <Form.Group className="mb-3 text-style" controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
      </Form.Group>

      <Form.Group className="mb-3 text-style" controlId="formBasicUsername">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
      </Form.Group>

        {/* Si el mensaje de error no es nulo, es que se ha seteado como que algo pasa a lo largo del código, y se mostraría aquí. */}
        { errorMessage !== null && <p className="required-alert">{errorMessage}</p> }

        <br />
        <Button variant="outline-dark" className="register-btn" type='submit'>Login</Button>
        <br />

        <br />

        <Alert className="register-now-alert" variant={"secondary"}>
            <Link className="register-now-alert" to={"/signup"}>Not registered? Sign up!</Link>
        </Alert>

        <br />


      </Form>
    </div>
    </div>
  );
}

export default Login;
