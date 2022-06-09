import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { AuthContext } from '../../context/auth.context';
import { listGamesDetailsService } from '../../services/games.services';
import { listCollectionsService } from '../../services/profile.services';
import GameComp from '../../components/GameComp'

function Collections() {


  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const [gamesCollection, setGamesCollection] = useState([]);
  //! *******************************************************
  const [gameDetails, setGameDetails] = useState(null);
  //! *******************************************************

  useEffect(() => {
    getGamesCollection();
  }, [])

  const getGamesCollection = async () => {
    try {
      const responseCollection = await listCollectionsService(user._id)
      const responseDetails = await listGamesDetailsService(responseCollection.data.id);
      setGamesCollection(responseCollection.data)
      setGameDetails(responseDetails.data);
      console.log("Collections:", responseCollection)
      console.log("Collections2:", responseDetails)      
    } catch (error) {
      navigate("/error")
    }
  } 

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
                <img src={eachCollection.background_image} alt="" />
                <GameComp data={eachCollection}/>
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