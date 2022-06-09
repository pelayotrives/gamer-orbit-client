import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>

        <div>
            <br />
            <h1>Home</h1>
            <br />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere arcu et urna condimentum lobortis. Curabitur lobortis porttitor commodo. Nam hendrerit massa nec ante vehicula porttitor. Sed dapibus nulla id vehicula placerat. Phasellus quis ipsum a sapien pretium sodales. Nulla mattis nisi posuere tempus semper. Duis quis imperdiet est. Etiam blandit sem sit amet ante viverra, ac tempus nibh aliquam. Cras sit amet hendrerit dolor, vel placerat enim. Curabitur tincidunt nisi odio, condimentum viverra turpis malesuada in. Vestibulum eget purus in tortor molestie posuere eget non nulla. Nullam scelerisque, lacus nec mattis malesuada, ante erat iaculis elit, ac congue tellus lectus eu justo. Morbi interdum enim non malesuada porttitor. Sed interdum nulla ac libero viverra tristique.</p>
            <NavLink to={"/videogames"}>Take a look to our videogame selection!</NavLink>
        </div>

    </div>
  )
}

export default Home