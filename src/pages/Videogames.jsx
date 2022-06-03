import React, { useEffect } from "react";
import axios from "axios";

function Videogames() {

  const getVideogames = async () => {

    try {
      const response = await axios.get("https://api.rawg.io/api/games?key=7442caa537d64aa4aabdf9d11167cc49");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideogames();
  }, [])


  return <div></div>;
}

export default Videogames;
