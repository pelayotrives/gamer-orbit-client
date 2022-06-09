import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { listGamesDbService } from '../../services/games.services';


function Collections() {


  const navigate = useNavigate();

  const {id} = useParams()

  const [gamesCollection, setGamesCollection] = useState([]);

  useEffect(() => {
    getGamesCollection()
  }, [])

  const getGamesCollection = async () => {
    try {
      const response = await listGamesDbService(id)
      setGamesCollection(response.data)
      console.log("collections", gamesCollection)
    } catch (error) {
      navigate("/error")
    }
  }

  if (gamesCollection === null) {
    return (
      <PulseLoader color= {"rgb(0,0,0"} />
    );
  };

  
  return (
    <div key = {gamesCollection.id}>

    {gamesCollection.state === "isPlaying" &&
      <div>
      {gamesCollection.title}
      </div>
      }
      {gamesCollection.state === "isOwned" &&
        <div>
        {gamesCollection.title}
        </div>
      }
      {gamesCollection.state === "isWished" &&
        <div>
        {gamesCollection.title}
        </div>
      }
      {gamesCollection.state === "isFinished" &&
        <div>
        {gamesCollection.title}
        </div>
      }

    
    
    
    
    
    </div>
  )
}

export default Collections