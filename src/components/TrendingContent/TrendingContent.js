// Services
import * as tablatureServices from '../../services/tablatureServices'

// Components / hooks
import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { CircularProgress, Grid } from '@mui/material';
import { useParams } from "react-router-dom"

const TrendingContent = () => {
    const [trendingTablature, setTrendingTablature] = useState(null)
    const [tablatureFromRoute, setTablatureFromRoute] = useState(null)
    const { tabId } = useParams()

    useEffect(() => {
        if(trendingTablature === null) {
            tablatureServices.getTrendingTablature()
            .then( res => {
                setTrendingTablature(res.publicTablature)
            })
        }
    }, [trendingTablature])

    useEffect(() => {
        if(tabId && tablatureFromRoute === null) {
            console.log(tabId)
            tablatureServices.getTablatureById(tabId)
            .then( res => {
                console.log(res)
                setTablatureFromRoute(res.tablature)
            })
        }
    }, [tabId, tablatureFromRoute])

    return (
        <>
            {trendingTablature === null 
                ?
                    <CircularProgress />
                :
                    <Grid container spacing={2}>
                        {tablatureFromRoute &&
                            <Card
                                key={-1}
                                tabData={tablatureFromRoute}
                                authorData={{
                                    user: tablatureFromRoute.owner.user,
                                    preferredUsername: tablatureFromRoute.owner.preferredUsername
                                }}
                                isExpanded={true}
                            />
                        }
                        {trendingTablature.map( (tablature, index) => {
                            if(tabId !== tablature._id) {
                                return (
                                    <Card
                                        key={index}
                                        tabData={tablature}
                                        authorData={{
                                            user: tablature.owner.user,
                                            preferredUsername: tablature.owner.preferredUsername
                                        }}
                                    />
                                )}
                            }
                        )}
                    </Grid>
            }
        </>
    );
}
 
export default TrendingContent;