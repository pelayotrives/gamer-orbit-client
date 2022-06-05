import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>

        <h1>Home</h1>
        <NavLink to={"/videogames"}>¡Echa un vistazo a las últimas novedades!</NavLink>

    </div>
  )
}

export default Home