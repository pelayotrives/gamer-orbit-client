import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { commentsService } from '../services/games.services';
import "../App.css"
import { AuthContext } from '../context/auth.context';
// import { commentsService, listGamesDetailsService, viewCommentsService } from '../services/games.services';



function CommentsForm () {

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
        <textarea name='comment' rows={10} cols={40} onChange={handleCommentsChange}></textarea>
        <br /> <br />
        <button type="submit">Submit</button>
      </form> }
      </div>
    )
}

export default CommentsForm