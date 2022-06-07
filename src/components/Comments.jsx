import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../App.css"
import { AuthContext } from '../context/auth.context';
import { commentsService, viewCommentsService } from '../services/games.services';



function Comments () {

    const {id, timestamps} = useParams();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

    console.log(user)

    const [comment, setComment] = useState([])

    const handleCommentsChange = (event) => {
        setComment(event.target.value);
        console.log(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const commentDetails = {
                userId: user._id,
                username: user,
                comment,
                timestamps
            };

            await commentsService(id, commentDetails)
            navigate(`/videogames/${id}/`)

        }catch(error) {
            navigate(error)
        }
    }

    useEffect(() => {

    }, [])

    const getComments = async () => {
        try{

            const response = await viewCommentsService(id)
            setComment(response.data)

        }catch(error){
            navigate("/error")
        }
    }

  return (
    <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-container">
        {comment}
        <form onSubmit={handleSubmit}></form>
        <label htmlFor="comment">About me: </label>
        <textarea name='comment' rows={10} cols={40} value={comment} onChange={handleCommentsChange}></textarea>
        <br />
        <button type="submit">Comment</button>
        </div>
        </div>
  )
}

export default Comments