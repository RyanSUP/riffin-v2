import { useEffect, useState } from "react";
import * as tablatureServices from "../../services/tablatureServices"

const Trending = () => {
    const [trendingTablature, setTrendingTablature] = useState(null)

    useEffect(() => {
       if(!trendingTablature) {
            tablatureServices.getTrendingTablature()
            .then( res => {
                console.log(res)
            })
       } 
    },[])

    return (
        <>
            <>I'm trending!</>
        </>
    );
}
 
export default Trending;