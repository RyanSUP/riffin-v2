// Services
import * as tablatureServices from '../../services/tablatureServices';

// Components / hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CircularProgress } from '@mui/material';
import TablatureCard from "../TablatureCard/TablatureCard"

// TODO: Users can type in a tab id of a private tab and retrieve the data. This should not happen - if the tab they are requesting is private they should be redirected to trending.

const SingleTablatureContent = (props) => {
    const [tablature, setTablature] = useState(null)
    const { tabId } = useParams()

    useEffect(() => {
        tablatureServices.getTablatureById(tabId)
        .then( res => {
            console.log(res)
            setTablature(res.tablature)
        })
    }, [tabId])

    return (
        <>
            {tablature === null ?
                <CircularProgress />
            :
                <TablatureCard 
                    tablature={tablature}
                    nameOfOwner={tablature.owner.preferredUsername}
                />
            }
        </>
    );
}
 
export default SingleTablatureContent;