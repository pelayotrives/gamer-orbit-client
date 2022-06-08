import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { viewCommentsService } from '../services/games.services'


function Comments() {

    const navigate = useNavigate()

    const {id} = useParams()

    const [renderComments, setRenderComments] = useState(null)

    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        try {
            const response = await viewCommentsService(id)
            setRenderComments(response.data)
            console.log(response.data)
        } catch (error) {
            navigate("/error")
        }
    }

    if (renderComments === null) {
        return (
            
            <PulseLoader color={"rgb(0,0,0)"} />
            
        );
    }

    

    return (

        <div>
           {

            renderComments.map((each) => {
                return (
                    <div>

                    <p>{each.comment}</p>

                    </div>
                )
            })

           }
            

        </div>




    )




}

export default Comments