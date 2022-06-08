import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { viewCommentsService } from '../services/games.services'


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
            // console.log("Josu", response.data)
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
                            <hr />
                                <p><strong>{each.usernameId.username.toUpperCase()}</strong></p>
                                <p>{each.createdAt}</p>
                                <p>{each.comment}</p>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )




}

export default Comments