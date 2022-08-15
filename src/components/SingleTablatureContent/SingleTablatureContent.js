import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as tablatureServices from '../../services/tablatureServices';
import { CircularProgress } from '@mui/material';
import TablatureCard from "../TablatureCard/TablatureCard"

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