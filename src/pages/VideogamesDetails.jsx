import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthContext, isLoggedIn } from '../context/auth.context'
import {
  listGamesDbService,
  listGamesDetailsService,
  listGamesTrailersService,
} from "../services/games.services";

// Hemos instalado Markup de Interweave con npm i interweave. Convierte strings de html en strings jsx.
import { Markup } from "interweave";
import StarRating from "../components/Rating";
import CommentsForm from "../components/CommentsForm";
import Comments from "../components/Comments";
import {Carousel} from "react-bootstrap";
import ReactPlayer from "react-player"
import "bootstrap/dist/css/bootstrap.css"



function VideogamesDetails() {
  const { isLoggedIn, user } = useContext(AuthContext)
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
        userId: user._id,
        gameApiId: id,
        title: gameDetails.name,
        status,
      };

      await listGamesDbService(id, dbDetails);
      navigate(`/profile/collections`);
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
        <br /> <br />
        <h4>Loading...</h4>
        <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
    // TODO ---> Lo mismo pero para los trailers
  } else if (gameTrailer === null) {
    return (
      <>
        <h4>Loading...</h4>
        <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  } else if (status === null) {
    return (
      <>
        <h4>Loading...</h4>
        <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  }

  //! ************************LTSU: PASO 1********************************

  // const addComment = (commentToAdd) => {
  //   console.log(commentToAdd);
    
  // }

  //! *************************LTSU: PASO 1*******************************

  return (
    <div>

      {/* {console.log("Información de trailer:", gameTrailer)} */}

      <div id="category">
        <h1>{gameDetails.name} details</h1>
      </div>

      <div id="image-game">
        {/* Imagen del juego */}
        <img src={gameDetails.background_image} width={900} alt="Cover" />
        {/* <img
          src={gameDetails.background_image_additional}
          width={900}
          alt="Cover"
        /> */}
      </div>

      <div id="select-form">
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
      </div>

      <div id="star-component">
        <br />
        <StarRating />
      </div>

        {/* Nombre del juego */}

      <div id="game-title"> 
        <h2>{gameDetails.name}</h2>
      </div>
      
      <div id="alternative-game-titles-head">
        { gameDetails.alternative_names.length !== 0 &&
            <>
            <h3>Nombres alternativos:</h3>
            </>
        }
      </div>

      <div id="alternative-game-titles-content">
        {/* Nombres alternativos del juego que vienen en array */}
        {gameDetails.alternative_names.length !== 0 &&
          gameDetails.alternative_names.map((eachTitle) => {
            return (
              <div>
                <p>{eachTitle}</p>
              </div>
            );
          })}
      </div>

      <div id="developer-content">
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
      </div>

      <div id="release-date">
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
      </div>

      <div id="platforms">
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
      </div>

      <div id="game-website-button">
        <button>
          <a href={gameDetails.website}>Ir a website</a>
        </button>
      </div>

      <div id="game-description">
        <h3>Descripción:</h3>
        {/* Descripción del juego */}
        <Markup content={gameDetails.description} />
      </div>


        {/* Trailers del juego (vienen en array) */}

      <div id="game-trailer-title">
        { gameTrailer.results.length !== 0 &&
            <>
              <h3>Trailers</h3>
            </>
        }
      </div>

      <div className="App">
      <Carousel>
        {gameTrailer.results.length !== 0 &&
          gameTrailer.results.map((eachTrailer) => {
            return (
              <Carousel.Item key={eachTrailer.id}>
                <ReactPlayer
                  url={eachTrailer.data.max}
                  pip={true}
                  controls={true}
                  playing={false}
                />
                
              </Carousel.Item>     
          
            );
          })

        }
        </Carousel>
      </div>

      {isLoggedIn === true &&

      <div id="comments-components">
 

          <Comments/>

          {/* ************************LTSU: PASO 2************************ */}
          {/* <CommentsForm addComment={addComment}/> */}
          {/* ************************LTSU: PASO 2************************ */}

      </div>
    }
    </div>
  );
}

export default VideogamesDetails;
