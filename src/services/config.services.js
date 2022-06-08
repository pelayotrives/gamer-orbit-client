import axios from "axios";

//! Este archivo es un lugar donde estará configurado el servicio, para poder evitar tener que poner tantas veces un mismo URL.
//! Digamos que este es el archivo raíz y los demás servicios los agruparemos en la misma carpeta.

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`
})

//! Código donde el token será enviado al back.
service.interceptors.request.use((config) => {
    
    // Aquí voy a buscar el token en localStorage
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
        config.headers = { authorization: `Bearer ${authToken}` }
    }

    return config

})

export default service