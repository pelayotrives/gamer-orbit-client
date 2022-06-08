import React, { useEffect, useState } from 'react'


function Comments() {

    const {id} = useParams()

    const [renderComments, setRenderComments] = useState("")




}
 
//  // Funcion para traer el servicio de comentarios y guardar el estado con los datos
//  const getComments = async () =>{
//     try {
//       const response = await viewCommentsService(id);
//       setComment(response.data);
//       console.log("Los comentarios")
//     } catch (error) {
//       navigate("/error")
//     }
//   }

export default Comments