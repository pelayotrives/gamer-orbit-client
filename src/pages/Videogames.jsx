import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";
import { listGamesService } from "../services/games.services";

function Videogames() {
  const navigate = useNavigate();

  //* Pasos para llamar a la API e interactuar con el contenido
  //! 1. Estados
  const [allGames, setAllGames] = useState(null);
  //TODO ---> const [searchingData, setSearchingData] = useState(true)

  //! 2. Acceder al componentDidMount
  useEffect(() => {
    getVideogames();
  }, []);

  //! 3. Función que llama a la API y se comunica con componentDidMount().
  const getVideogames = async () => {
    try {
      //* 1.) Llamada a Axios
      const response = await listGamesService();
      console.log(response);

      //* 2.) Actualizamos el estado con la respuesta de la API. En Axios, siempre es el "nombreDeLaConst.data".
      setAllGames(response.data);

      //TODO ---> 3.) Estado del spinner
      //TODO ---> Invocación de la actualización de estado para activar el Loading
      //TODO ---> setSearchingData(false)
    } catch (error) {
      navigate("/error");
    }
  };

  //! 4. Crear efecto de Loading.
  if (allGames === null) {
    return <PacmanLoader color={"rgb(0,0,0)"} />;
  }

  // ************************ RENDER ************************

  return (
    <div>
      {allGames.results.map((eachGame) => {
        return (
          <div key={eachGame.id}>
            <p>{eachGame.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Videogames;
