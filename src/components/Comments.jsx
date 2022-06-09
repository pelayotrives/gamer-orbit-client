import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { viewCommentsService } from '../services/games.services'
import CommentsForm from './CommentsForm'


function Comments() {

    const navigate = useNavigate()

    const {id} = useParams()

    const [renderComments, setRenderComments] = useState([])

    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        try {
            const response = await viewCommentsService(id)
            setRenderComments(response.data)
        } catch (error) {
            navigate("/error")
        }
    }

    if (renderComments === null) {
        return (
            <PulseLoader color={"rgb(0,0,0)"} />
        );
    }

    console.log(renderComments);

    return (
        
        <div>
            {renderComments !== null &&
                renderComments.map((each) => {
                    return (
                        <div>
                            <br />
                            <hr />
                                <p><span>Created on <strong>{each.createdAt.slice(0,10)}</strong></span> at <span><strong>{each.createdAt.slice(11,19)}</strong></span></p>
                                <p>User <strong>{each.usernameId.username.toUpperCase()}</strong> says:</p>
                                <p>{each.comment}</p>
                            <hr />
                        </div>
                    )
                })
            }
        {/* Meto aquí el componente y le pongo props. Dichos props se los voy a pasar a CommentForm, todo para poder hacer que cuando enviemos un comment, se actualice y refresque solo. */}
        <CommentsForm getComments={getComments}/>
        </div>
    )




}

export default Comments