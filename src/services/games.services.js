import service from "./config.services";

//* Creamos un servicio que busca todos los archivos de juegos.

const listGamesService = () => {
    console.log("Rotísimo.");
    return service.get("/videogames")
}

export {
    listGamesService
}