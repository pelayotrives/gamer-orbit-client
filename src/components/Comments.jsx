import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { viewCommentsService } from '../services/games.services'
import CommentsForm from './CommentsForm'

import Card from 'react-bootstrap/Card';


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

    // console.log(renderComments);

    return (
        
        <div>
            {renderComments !== null &&
                renderComments.map((each) => {
                    return (

                        <div>
                            <br /><br />
                            <Card className='container' >
                                    <Card.Title className="text-muted">User <strong>{each.usernameId.username}</strong> says:</Card.Title>
                                    <Card.Subtitle className="text-muted">Created on <strong>{each.createdAt.slice(0,10)}</strong> at <strong>{each.createdAt.slice(11,19)}</strong></Card.Subtitle>
                                    <br />
                                    <Card.Text>{each.comment}</Card.Text>
                                    <br />
                             </Card>
                        </div>
                    )
                })
            }
        {/* Meto aquí el componente y le pongo props. Dichos props se los voy a pasar a CommentForm, todo para poder hacer que cuando enviemos un comment, se actualice y refresque solo. */}
        <br /><br />
        <CommentsForm getComments={getComments}/>
        </div>
    )




}

export default Comments