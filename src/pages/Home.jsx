import React from 'react'
import { NavLink } from 'react-router-dom'

import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <div>

        <div id='background-image-div'>
          <div id="whiteBack">
            <br /> <br />
            <img src="../../Logo3.png" alt="Logo" width={150} />
            <br /><br />
            <h1 style={{fontSize: "40px"}}>Welcome to Gamer Orbit!</h1>
            <h3 style={{fontSize: "25px"}}>Manage your games in less than a minute!</h3>
            <br />
              <Button variant="outline-dark" className="register-btn"><NavLink to={"/videogames"} className="navhome">Take a look to our videogame selection!</NavLink></Button>
              <br /><br /> 
          </div>
        </div>

    </div>
  )
}

export default Home