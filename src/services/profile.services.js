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




export {
    listProfileService,
    profileEditService
}