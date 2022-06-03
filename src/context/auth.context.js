import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext()

function AuthWrapper(props) {

    // estado para saber si está logueado
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    //chequeará continuamente si está logueado
    const authenticateUser = async () => {
        try {
            // donde llamaremos a esa ruta verify y nos dará la información del payload
            const response = await verifyService()
            console.log("Token valido")
            console.log("el payload es:", response.data)
            setIsLoggedIn(true)
            setUser(response.data)
        } catch (error) {
            console.log("El usuario no tiene token válido.")
            setIsLoggedIn(false)
            setUser(null)
        }
    }

    const passedContext = {
        isLoggedIn,
        user,
        authenticateUser
    }

    useEffect(() => {
        authenticateUser()
    }, [])


    return (

        // esto simplemente es para definir que lo que vaya entre el wrapper va a ser el props.children
        // por ejemplo, si envolvemos el index con el wrapper, el index es lo que se convierte en el props.children.
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )



}

export {AuthContext, AuthWrapper}