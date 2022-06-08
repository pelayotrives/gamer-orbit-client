import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthContext } from '../context/auth.context'
import {
  listGamesDbService,
  listGamesDetailsService,
  listGamesTrailersService,
} from "../services/games.services";

// Hemos instalado Markup de Interweave con npm i interweave. Convierte strings de html en strings jsx.
import { Markup } from "interweave";
import StarRating from "../components/Rating";
import CommentsForm from "../components/CommentsForm";

function VideogamesDetails() {
  const { isLoggedIn } = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();

  // Llamar a la API
  //! 1. Estados
  const [gameDetails, setGameDetails] = useState(null);
  // TODO ---> Estado para los trailers
  const [gameTrailer, setGameTrailers] = useState(null);
  const [status, setStatus] = useState("isOwned");
  // Comentarios
  
  // const [rating, setRating] = useState(0)

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const dbDetails = {
        gameApiId: id,
        title: gameDetails.name,
        status,
      };

      await listGamesDbService(id, dbDetails);
      navigate(`/videogames/${id}/collections`);
    } catch (error) {
      navigate("/error");
    }
  };

  //! 2. Acceder al componentDidMount
  // TODO ---> componentDidMount para los trailers debajo
  useEffect(() => {
    getVideogamesDetails();
    getVideogamesTrailers();
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
    } catch (error) {
      navigate("/error");
    }
  };

  // TODO ---> Función de comunicación con la API para los trailers
  const getVideogamesTrailers = async () => {
    try {
      const response = await listGamesTrailersService(id);
      setGameTrailers(response.data);
      console.log("Trailers and bullshit:", response.data);
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
    // TODO ---> Lo mismo pero para los trailers
  } else if (gameTrailer === null) {
    return (
      <>
        <h4>Cargando...</h4>
        <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  } else if (status === null) {
    return (
      <>
        <h4>Cargando...</h4>
        <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  }

  return (
    <div>
      {console.log("Información de trailer:", gameTrailer)}
      <h3>Detalles del Videojuego</h3>
      <hr />

      <div key={gameDetails.id}>
        {/* Imagen del juego */}
        <img src={gameDetails.background_image} width={900} alt="Cover" />
        {/* <img
          src={gameDetails.background_image_additional}
          width={900}
          alt="Cover"
        /> */}

        {/* Formulario para añadir el juego a colecciones (conexión con User.Model) */}
        { isLoggedIn === true &&
        <form onSubmit={handleSubmit}>
          <br />
          <select name="select" onChange={handleStatusChange}>
            <option value={"isOwned"}>Owned games</option>
            <option value={"isWished"}>Wished games</option>
            <option value={"isFinished"}>Finished games</option>
            <option value={"isPlaying"}>Currently playing games</option>
          </select>
          <br /> <br />
          <button type="submit">Submit</button>
        </form> }

        <StarRating />

        {/* Nombre del juego */}
        
        <h1>{gameDetails.name}</h1>

        { gameDetails.alternative_names.length !== 0 &&
            <>
            <h3>Nombres alternativos:</h3>
            </>
        }

        {/* Nombres alternativos del juego que vienen en array */}
        {gameDetails.alternative_names.length !== 0 &&
          gameDetails.alternative_names.map((eachTitle) => {
            return (
              <div>
                <p>{eachTitle}</p>
              </div>
            );
          })}

        <h3>Desarrollador(es):</h3>
        {/* Desarrolladores del juego (vienen en array.) */}
        {gameDetails.publishers.length !== 0 &&
          gameDetails.publishers.map((eachPublisher) => {
            return (
              <div>
                <p>{eachPublisher.name}</p>
              </div>
            );
          })}

        <h3>Fecha de salida:</h3>
        {/* Fecha de release. */}
        <p>{gameDetails.released}</p>

        <h3>Género(s):</h3>
        {/* Géneros del juego que vienen en array */}
        {gameDetails.genres.length !== 0 &&
          gameDetails.genres.map((eachGenre) => {
            return (
              <div>
                <p>{eachGenre.name}</p>
              </div>
            );
          })}

        <h3>Consola(s):</h3>
        {/* Consolas en las que el juego está disponible (vienen en array de array) */}
        {gameDetails.platforms.length !== 0 &&
          gameDetails.platforms.map((eachPlatform) => {
            return (
              <div>
                <p>{eachPlatform.platform.name}</p>
              </div>
            );
          })}

        <button>
          <a href={gameDetails.website}>Ir a website</a>
        </button>

        <h3>Descripción:</h3>
        {/* Descripción del juego */}
        <Markup content={gameDetails.description} />

        {/* ------------------------------------ */}

        {/* Trailers del juego (vienen en array) */}

        { gameTrailer.results.length !== 0 &&
            <>
              <h3>Trailers</h3>
            </>
        }

        {gameTrailer.results.length !== 0 &&

          gameTrailer.results.map((eachTrailer) => {
            return (
              <div key={eachTrailer.id}>
                <video width={900} controls src={eachTrailer.data.max} />
                {/* <source src={eachTrailer.data.max} type="video/mp4" /> */}
              </div>
            );
          })

        }
      </div>
        <div>
          <CommentsForm />
        </div>
    </div>
  );
}

export default VideogamesDetails;
