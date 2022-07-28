import { useLocation, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import TablatureInput from "../../components/TablatureInput/TablatureInput";
import { update, deleteTab } from "../../services/tablatureServices";
import { UserContext } from '../../App';
import { getIdTokenFromUser } from "../../utils/userUtils";

const TablatureEditor = () => {
    const { user } = useContext(UserContext);
    let { state } = useLocation()
    let { id } = useParams();
    const [tablature, setTablature] = useState(state.tablature)

    const printAllBars = () => {
        tablature.bars.forEach( bar => {
            console.log('==== === ===== ====')
            console.log('==== New Print ====')
            console.log('==== === ===== ====')
            console.log(bar.inputs)
            console.log(bar.dashes)
            console.log('==== ====== ====')
            console.log('==== Merged ====')
            console.log('==== ====== ====')
            
            let mergedValues = Array(245)
            if(bar.inputs.length !== bar.dashes.length) {
                console.error('input and dash lengths do not match')
            } else {
                let inputValueAsArray = bar.inputs.split('')
                let dashValueAsArray = bar.dashes.split('')
                for(let i = 0; i < 245; i++) {
                    if (inputValueAsArray[i] === " ") {
                        mergedValues.push(dashValueAsArray[i])
                    } else {
                        mergedValues.push(inputValueAsArray[i])
                    }
                }
            }

            console.log(mergedValues.join(''))
            console.log("=== === ===")
            console.log("=== END ===")
            console.log("=== === ===")
        })
    }

    const handleAddBar = () => {
        let barLabel = `Bar ${tablature.bars.length + 1}`
        let barTemplate = {
            label: barLabel,
            inputs: [],
            dashes: [],
        }

        tablature.bars.push(barTemplate)
        console.log(tablature.bars)

        setTablature( { ...tablature } )
    }

    const updateBarValues = (barIndex, newInputs, newDashes) => {
        tablature.bars[barIndex].inputs = newInputs
        tablature.bars[barIndex].dashes = newDashes
        setTablature( { ...tablature } )
    }

    const handleDeleteBar = (barIndex) => {
        const newBars = tablature.bars.filter( (bar, i) => i !== barIndex)
        tablature.bars = newBars
        setTablature( {...tablature} )
    }

    const handleSaveTablature = () => {
        const idToken = getIdTokenFromUser(user);
        update(tablature, idToken)
        .then( res => {
            console.log(res)
        })
    }

    const handleDeleteTablature = () => {
        const idToken = getIdTokenFromUser(user);
        deleteTab(tablature._id, idToken)
        .then( res => {
            console.log(res)
        })
    }

    return (
        <>
            {id}
            { tablature.bars?.map( 
                (bar, i) => 
                    <TablatureInput handleDeleteBar={handleDeleteBar} updateBarValues={updateBarValues} index={i} key={bar.label} /> 
            )}
            <button onClick={printAllBars}>Print all bars</button>
            <button onClick={handleAddBar}>Add bar</button>
            <button onClick={handleSaveTablature}>Save</button>
            <button onClick={handleDeleteTablature}>Delete</button>
        </>
    );
}
 
export default TablatureEditor;