import axios from "axios";
import service from "./config.services";

//* Creamos un servicio que busca todos los archivos de acceso y registro de la base de datos.

const signupService = (user) => {
    return service.post("/auth/signup", user)
}

const loginService = (user) => {
    return service.post("/auth/login", user)
}

const verifyService = () => {
    return service.get("/auth/verify")
} //! Necesitaremos configurar el envío del token.

export {
    signupService,
    loginService,
    verifyService
}