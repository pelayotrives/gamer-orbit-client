import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { AuthContext } from '../../context/auth.context';
import { listGamesDetailsService } from '../../services/games.services';
import { listCollectionsService } from '../../services/profile.services';

function Collections() {


  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const [gamesCollection, setGamesCollection] = useState([]);
  //! *******************************************************
  const [gameDetails, setGameDetails] = useState(null);
  //! *******************************************************

  console.log("OSTIA", user)

  useEffect(() => {
    getGamesCollection();
    getVideogamesDetails();
  }, [])

  const getGamesCollection = async () => {
    try {
      const response = await listCollectionsService(user._id)
      setGamesCollection(response.data)
      console.log("Collections:", gamesCollection)
    } catch (error) {
      navigate("/error")
    }
  }

  //! *******************************************************
  const getVideogamesDetails = async () => {
    try {
      // 1. Llamada a la API
      const response = await listGamesDetailsService();
      console.log("Games Details", response.data);

      // 2. Actualizamos el estado con la respuesta de la API.
      setGameDetails(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      navigate("/error");
    }
  };
  //! *******************************************************

  if (gamesCollection === null || gameDetails === null) {
    return (
      <PulseLoader color= {"rgb(0,0,0"} />
    );
  };

  console.log("Contengo esto en gameDetails:", gameDetails);
  console.log("Contengo esto en gamesCollection:", gamesCollection);

  
  return (
    <div>
    <h2>Status</h2>

    <h3>I own:</h3>
      {
        gamesCollection.map( (eachCollection) => {
          return (
            <div>
              <h4>{eachCollection.title}</h4>
              <h6>{eachCollection.state}</h6>
              <p></p>
            </div>
          )
        })
      }

    <h5>I'm playing:</h5>
    <h5>I've finished</h5>
    <h5>Wishlist</h5>

    </div>
  )
}

export default Collections