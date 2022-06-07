import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../App.css"



function Comments () {

    const {_id} = useParams()

    const [videogameComments, setVideogameComments] = useState([])

    useEffect(() => {

    }, [])

  return (
    <div>Comments</div>
  )
}

export default Comments