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
  const [gameDetails, setGameDetails] = useState([])

  useEffect(() => {
    getGamesCollection();
    getVideogamesDetails();
  }, [])

  //! API
  const getVideogamesDetails = async () => {
    try {
      // 1. Llamada a la API
      const response = await listGamesDetailsService(gamesCollection.gameApiId);
      // -----------> console.log("Games Details", response.data);

      // 2. Actualizamos el estado con la respuesta de la API.
      setGameDetails(response.data);
      // -----------> console.log("response.data", response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const getGamesCollection = async () => {
    try {
      const responseCollection = await listCollectionsService(user._id)
      const responseDetails = await listGamesDetailsService(responseCollection.data.id);
      setGamesCollection(responseCollection.data)
      setGameDetails(responseDetails.data);
      // -----------> console.log("Collections:", responseCollection)
      // -----------> console.log("Collections2:", responseDetails)      
    } catch (error) {
      navigate("/error")
    }
  }

  if (gamesCollection === null || gameDetails === null) {
    return (
      <PulseLoader color= {"rgb(0,0,0"} />
    );
  };

  // -----------> console.log("Contengo esto en gameDetails:", gameDetails);
  // -----------> console.log("Contengo esto en gamesCollection:", gamesCollection);

  
  return (
    <div>

      <br /><br />
      <h1>Collections</h1>
      <br />
      <p>Here you will find your very own collections!</p>
      <br /><br />

      { gamesCollection.length === 0 && 
        <p>You have no collections.</p>
      }

      {
          gamesCollection.map( (eachCollection) => {
            
            if (eachCollection.state === "isFinished") {

              return ( 
               <div className='collectiondiv'>
               <br/><br/>
                  <GameComp data={eachCollection}/>
                  <br />
                  <h5>This game belongs to your <strong style={{color:"red"}}>finished</strong> collection</h5>
                  <p>Added to collection: <strong>{eachCollection.createdAt.slice(0,10)}</strong></p>
                  <br/><br/>
                </div>
              )

            }

            if (eachCollection.state === "isOwned") {

              return ( 
               <div className='collectiondiv'>
               <br/><br/>
                  <GameComp data={eachCollection}/>
                  <br />
                  <h5>This game belongs to your <strong style={{color:"blue"}}>owned</strong> collection</h5>
                  <p>Added to collection: <strong>{eachCollection.createdAt.slice(0,10)}</strong></p>
                  <br/><br/>
                </div>
              )

            }

            if (eachCollection.state === "isPlaying") {

              return ( 
               <div className='collectiondiv'>
               <br/><br/>
                  <GameComp data={eachCollection}/>
                  <br />
                  <h5>This game belongs to your <strong style={{color:"green"}}>currently playing</strong> collection</h5>
                  <p>Added to collection: <strong>{eachCollection.createdAt.slice(0,10)}</strong></p>
                  <br/><br/>
                </div>
              )

            }

            if (eachCollection.state === "isWished") {

              return ( 
               <div className='collectiondiv'>
               <br/><br/>
                  <GameComp data={eachCollection}/>
                  <br />
                  <h5>This game belongs to your <strong style={{color:"orange"}}>wishlist</strong> collection</h5>
                  <p>Added to collection: <strong>{eachCollection.createdAt.slice(0,10)}</strong></p>
                  <br/><br/>
                </div>
              )

            }

          })    

      }

    </div>
  )
}

export default Collections