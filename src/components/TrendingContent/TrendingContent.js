// Services
import * as tablatureServices from '../../services/tablatureServices'

// Components / hooks
import { useEffect, useState } from 'react'
import TablatureCard from '../TablatureCard/TablatureCard';
import { CircularProgress } from '@mui/material';

const TrendingContent = () => {
    const [trendingTablature, setTrendingTablature] = useState()


    useEffect(() => {
        if(!trendingTablature) {
            tablatureServices.getTrendingTablature()
            .then( res => {
                setTrendingTablature(res.publicTablature)
            })
        }
    }, [trendingTablature])


    return (
        <>
            {trendingTablature === undefined ?
                <CircularProgress />
                :
                <>
                    {trendingTablature.map( (tabData, index) => (
                        <TablatureCard 
                            key={index}
                            tablature={tabData}
                            nameOfOwner={tabData.owner.prefferedUsername}
                        />
                    ))}
                </>
            }
        </>
    );
}
 
export default TrendingContent;