import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { commentsService } from '../services/games.services';
import "../App.css"
import { AuthContext } from '../context/auth.context';
// import { commentsService, listGamesDetailsService, viewCommentsService } from '../services/games.services';



function CommentsForm (props) {

    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext)

    //!************************LTSU: PASO 3************************
    const {addComment} = props
    //!************************LTSU: PASO 3************************

    const {id} = useParams()

    const [comment, setComment] = useState(null)

    // useEffect(() => {
      
    // }, [])
    

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

            // ************************LTSU: PASO 4************************
            // addComment(commentDetails)
            // ************************LTSU: PASO 4************************

            await commentsService(id, commentDetails);
            navigate(`/videogames/${id}/details`)
        }catch(error){
            navigate("/error")
        }
    }

    return (
        <div>
        {/* Formulario para añadir el comentario a colecciones (conexión con User and Videogame.Model) */}
      { isLoggedIn === true &&
      <>
        <h4>Comments:</h4>
        <form onSubmit={handleCommentSubmit}>
          <br />
          <textarea name='comment' rows={10} cols={40} onChange={handleCommentsChange}></textarea>
          <br /> <br />
          <button type="submit">Submit</button>
        </form>
      </> }
      </div>
    )
}

export default CommentsForm