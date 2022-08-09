// Services
import { useEffect, useState } from "react";
import * as tablatureServices from "../../services/tablatureServices"

const Trending = () => {
    const [trendingTablature, setTrendingTablature] = useState(null);

    /**
     * Fetch all public tablature and put it in state.
     */
    useEffect(() => {
       if(!trendingTablature) {
            tablatureServices.getTrendingTablature()
            .then( res => {
                setTrendingTablature(res.publicTablature);
            });
       } 
    },[trendingTablature]);

    return (
        <>
            <>I'm the trending component!</>
        </>
    );
}
 
export default Trending;