import service from "./config.services";

//* Creamos un servicio que busca perfiles.

const listProfileService = () => {
    console.log("Working profile.");
    return service.get("/profile")
}


export {
    listProfileService
}