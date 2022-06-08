import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { viewCommentsService } from '../services/games.services'


function Comments() {

    const navigate = useNavigate()

    const {id} = useParams()

    const [renderComments, setRenderComments] = useState("")

    useEffect(() => {
        getComments()
    }, [])

    const getComments = () => {
        try {
            const response = await viewCommentsService(id)
            setRenderComments(response.data)
        } catch (error) {
            navigate("/error")
        }
    }

    if (renderComments === null) {
        return (
            <>
            <h4>Cargando...</h4>
            <PulseLoader color={"rgb(0,0,0)"} />
            </>
        );
    }

    return (

        <div>
            <h3>Comments</h3>
        </div>




    )




}

export default Comments