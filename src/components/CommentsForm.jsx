import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { commentsService } from '../services/games.services';
import "../App.css"
import { AuthContext } from '../context/auth.context';
// import { commentsService, listGamesDetailsService, viewCommentsService } from '../services/games.services';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CommentsForm (props) {

    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext)

    //! Aquí desestructuraremos getComments que nos hemos traído con props para que se refresque el comentario.
    const {getComments} = props

    const {id} = useParams()

    const [comment, setComment] = useState("")

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
            //! Aquí invocaremos la función del componente Comments que nos hemos traído con props para que se refresque el comentario.
            getComments()
            //! Con el REF hacemos que se borre el texto de textarea cuando hacemos submit al comentario.
            textareaRef.current.value = ""
          }catch(error){
            navigate("/error")
        }
    }

    const textareaRef = useRef()

    return (
        <div>
        {/* Formulario para añadir el comentario a colecciones (conexión con User and Videogame.Model) */}
      { isLoggedIn === true &&
      <>
        <h4>Comments:</h4>
        <Form className='container' onSubmit={handleCommentSubmit}>
          <br />
          {/* Metemos el atributo ref para borrar el comentario cuando hagamos submit. */}
          <Form.Control as="textarea" placeholder="Leave a comment here" name='comment' rows={5} cols={25} onChange={handleCommentsChange} ref={textareaRef} />
          <br /> <br />
          <Button variant="outline-dark" className="register-btn" type="submit">Submit</Button>
        </Form>
      </> }
      </div>
    )
}

export default CommentsForm