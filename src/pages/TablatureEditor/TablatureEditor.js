import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TablatureInput from "../../components/TablatureInput/TablatureInput";
const TablatureEditor = () => {
    let { state } = useLocation()
    let { id } = useParams();
    const [tablature, setTablature] = useState(state.tablature)

    const printAllBars = () => {
        tablature.bars.forEach( bar => {
            console.dir(bar)
        })
    }

    return (
        <>
            {id}
            { tablature.bars?.map( bar => <TablatureInput />) }
            <button onClick={printAllBars}>Print all bars</button>
        </>
    );
}
 
export default TablatureEditor;