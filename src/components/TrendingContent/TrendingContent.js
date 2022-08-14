import { useEffect, useState } from 'react'
import TablatureCard from '../TablatureCard/TablatureCard';
import * as tablatureServices from '../../services/tablatureServices'
import { CircularProgress } from '@mui/material';

const TrendingContent = (props) => {
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
                            tablature={tabData}
                        />
                    ))}
                </>
            }
        </>
    );
}
 
export default TrendingContent;