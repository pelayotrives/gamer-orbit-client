import { useContext } from "react"
import { Navigate } from "react-router-dom"
import {AuthContext} from "../context/auth.context.js"

//! Ponemos en práctica el uso de HOC o Higher Order Components.
// Este componente va a recibir props... ++

function IsPrivate(props) {

  const {isLoggedIn} = useContext(AuthContext)

  if (isLoggedIn === true) {
    // ++ ...Además, no renderizará nada, lo unico que retornará sera props.children.
    // Este componente recibe props, recibe el componente que está englobando y lo retorna.
    return props.children
  } else {
    // No puedo hacer un navigate nada más cargar el componente funcional (la base del componente) como hacíamos en otros casos.
    // Por tanto, entra en juego el elemento de React Router Dom "Navigate". Funciona similar a useNavigate pero podemos usarlo en estas ocasiones.
    return <Navigate to={"/login"}/>
  }
    
  
}

export default IsPrivate