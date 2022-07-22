import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TablatureInput from "../../components/TablatureInput/TablatureInput";
const TablatureEditor = () => {
    const [bars, setBars] = useState([])
    let { id } = useParams();

    const handleNewBar = () => {
        setBars( prev => [...prev, <TablatureInput />])
    }

    const printAllBars = () => {
        bars.forEach( bar => {
            console.dir(bar)
        })
    }

    return (
        <>
            {id}
            <button onClick={handleNewBar}>New bar</button>
            {[...bars]}
            <button onClick={printAllBars}>Print all bars</button>
        </>
    );
}
 
export default TablatureEditor;