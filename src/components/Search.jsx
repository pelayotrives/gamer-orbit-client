<<<<<<< HEAD
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { listGamesDetailsService } from '../services/games.services'

function Search(props) {

  const [allGames, setAllGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log("Búsqueda =",event.target.value)
  }

  useEffect(() => {
    querySearch()
  }, [])

  const querySearch = async () => {
      try {  
        const response = await listGamesDetailsService()
         setAllGames(response.data)
         setFilteredGames(response.data)
      }
      catch(error) {
          navigate("/error")
      }
  }

  const filteredArray = (resultGame) => {
      const searchResult = allGames.filter( (eachGame) => {
          if ( eachGame.name.includes(resultGame) ) {
            return eachGame;
          }
      })
      setFilteredGames(searchResult)
  }

  return (
    <div>
        <label htmlFor="search">Search a videogame:</label> <br /> <br />
        <input className="input" name="search" type="text" onChange={handleSearch} placeholder="Type a videogame" value={search} />
    </div>
  )
}

export default Search
=======
import "./App.cs";
import "boostrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";


function SearchOption() {

    const navigate = useNavigate()

    const [games, setGames] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [searchbar, setSearchbar] = useState("");

    const getSearch = async () => {
    
        try {

            const response = await listGamesService(response.data);

        } catch (error) {
            Navigate("/error")
        }
    }
        return (
        <div className="App">

        </div>
    );

}

export default SearchOption;
>>>>>>> dc271bc58f43630c30a8a3400592e2f06b2f8c55
