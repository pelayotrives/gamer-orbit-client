import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { commentsService } from '../services/games.services';
import "../App.css"
import { AuthContext } from '../context/auth.context';
// import { commentsService, listGamesDetailsService, viewCommentsService } from '../services/games.services';



function Comments () {

    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext)

    const {id} = useParams()

    const [comment, setComment] = useState(null)

    const handleCommentsChange = (event) => {
        setComment(event.target.value);
        console.log(event.target.value)
      }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {

            const commentDetails = {
                comment
            }

            await commentsService(id, commentDetails);
            navigate(`/videogames/${id}/details`);
        }catch(error){
            navigate("/error")
        }
    }

    return (
        <div>
        <h4>Comments:</h4> 
        {/* Formulario para añadir el comentario a colecciones (conexión con User and Videogame.Model) */}
      { isLoggedIn === true &&
      <form onSubmit={handleCommentSubmit}>
        <br />
        <label htmlFor="comment">About me: </label>
        <textarea name='comment' rows={10} cols={40} onChange={handleCommentsChange}></textarea>
        <br /> <br />
        <button type="submit">Submit</button>
      </form> }
      </div>
    )



   



//     // const [comment, setComment] = useState([])

//     // const handleCommentsChange = (event) => {
//     //     setComment(event.target.value);
//     //     console.log(event.target.value);
//     // };
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {

//             const response = await listGamesDetailsService()

//             const commentDetails = {
//                 userId,
//                 gameApiId: id,
//                 username: user,
//                 comment,
//                 timestamps
//             };

//             await commentsService(id, commentDetails)
//             navigate(`/videogames/${id}/`)

//         }catch(error) {
//             navigate(error)
//         }
//     }

//     useEffect(() => {

//     }, [])

//     const getComments = async () => {
//         try{

//             const response = await viewCommentsService(id)
//             setComment(response.data)

//         }catch(error){
//             navigate("/error")
//         }
//     }

//   return (
//     <div className="comments">
//         <h3 className="comments-title">Comments</h3>
//         <div className="comments-container">
//         {comment}
//         <form onSubmit={handleSubmit}></form>
//         <label htmlFor="comment">About me: </label>
//         <textarea name='comment' rows={10} cols={40} value={comment} onChange={handleCommentsChange}></textarea>
//         <br />
//         <button type="submit">Comment</button>
//         </div>
//         </div>
//   )
}

export default Comments