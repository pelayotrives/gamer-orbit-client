// Paquete de rating
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

function StarRating() {
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
    // other logic
  }

  return (
    <div className='App'>
      <Rating onClick={handleRating} ratingValue={rating} size={25} stop={6} step={2} iconsCount={6} fillColorArray={["#F76D65", "#F76D65", "#E6DD39","#57D9B8", "#57D9B8"]} /* Available Props */ />
    </div>
  )
}

export default StarRating