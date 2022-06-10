import React from 'react'
import { NavLink } from 'react-router-dom'

import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <div>

        <div id='background-image-div'>
            <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4"/>
            <br /> <br />
            <img src="../../Logo3.png" alt="Logo" width={150} />
            <br /><br />
            <h1>Welcome to Gamer Orbit!</h1>
            <h3>Manage your games in less than a minute!</h3>
            <br />
              <Button variant="outline-dark" className="register-btn"><NavLink to={"/videogames"} className="navhome">Take a look to our videogame selection!</NavLink></Button> 
        </div>

    </div>
  )
}

export default Home