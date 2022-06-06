import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { listGamesDetailsService } from "../services/games.services";

function VideogamesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Llamar a la API
  //! 1. Estados
  const [gameDetails, setGameDetails] = useState(null);

  //! 2. Acceder al componentDidMount
  useEffect(() => {
    getVideogamesDetails();
  }, []);

  //! 3. Función que llama a la API y se comunica con componentDidMount
  const getVideogamesDetails = async () => {
    try {
      // 1. Llamada a la API
      const response = await listGamesDetailsService(id);
      console.log("Games Details", response.data);

      // 2. Actualizamos el estado con la respuesta de la API.
      setGameDetails(response.data);
      console.log("response.data", response.data);
      console.log("gameDetails", gameDetails);
    } catch (error) {
      navigate("/error");
    }
  };

  //! 4. Crear efecto de Loading.
  if (gameDetails === null) {
    return (
      <>
        <h4>Cargando...</h4>
        <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  }

  return (
    <div>
      <h3>Detalles del Videojuego</h3>

      <div key={gameDetails.id}>
        <p>{gameDetails.name}</p>
        <br />
        <img src={gameDetails.reddit_logo} alt="Game" />
      </div>
    </div>
  );
}

export default VideogamesDetails;
