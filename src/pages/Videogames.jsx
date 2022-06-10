import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { listGamesService } from "../services/games.services";
import Search from "../components/Search";

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
    return (
      <>
      <br /> <br />
      <h4>Loading...</h4>
      <PulseLoader color={"rgb(0,0,0)"} />
      </>
    );
  }

  // ************************ RENDER ************************

  return (
    <div>

      <br /><br />
      <h1>Find your favorite videogames!</h1>
      <br />
      <p>Click the link to see more detailed information about each game!</p>
      <br /><br />
      {allGames.results.map((eachGame) => {
        return (
          <div key={eachGame.id} id="divcentered">
              <div class="row row-cols-1 row-cols-md-4 g-2 homevideogame"> 
                <div className="item"><img src={eachGame.background_image} width={250} alt="" /></div>
                <br />
                <div className="item"><h4><Link to={`/videogames/${eachGame.id}/details`}>{eachGame.name}</Link></h4></div>
                <div className="item"><h6>Released in <strong>{eachGame.released}</strong></h6></div>
                <div className="item"><h6>Current rating is <strong>{eachGame.rating}</strong></h6></div>
            </div> 
            <br /><br />    
          </div>
        );

      })}

    </div>
      
  );
}

export default Videogames;
