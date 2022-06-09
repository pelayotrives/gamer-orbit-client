import service from "./config.services";

//* Creamos un servicio que busca perfiles.

const listProfileService = () => {
    console.log("Working profile.");
    return service.get("/profile")
}

const profileEditService = (_id, profile) => {
    console.log("Working profile edit.");
    return service.patch(`/profile/${_id}/edit`, profile)
}

//! Función para ruta DELETE donde eliminamos los usuarios.
const profileDeleteService = (_id) => {
    console.log("Working profile delete.");
    return service.delete(`/profile`)
}

// ruta para cloudinary
const uploadService = (uploadForm) => {
    return service.post("/uploader", uploadForm)
}


export {
    listProfileService,
    profileEditService,
    profileDeleteService,
    uploadService
}