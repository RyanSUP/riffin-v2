import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import TablatureInput from "../../components/TablatureInput/TablatureInput";
import { update, deleteTab, create } from "../../services/tablatureServices";
import { UserContext } from '../../App';
import { getIdTokenFromUser } from "../../utils/userUtils";
import { CircularProgress } from '@mui/material';

// TODO Pass to TablatureInput and remove from TablatureInput file
const mapOfFirstColumnIndexes = {
    0: true,
    41: true,
    82: true,
    123: true,
    164: true,
    205: true,
}

// TODO Pass to TablatureInput and remove from TablatureInput file
const mapOfLastColumnIndexes = {
    40: true,
    81: true,
    122: true,
    163: true,
    204: true,
    245: true,
}
const initTextAreaWithValue = (character) => {
    let charactersInString = [];
    for(let i = 0; i < 245; i++) {
        if(i in mapOfLastColumnIndexes) {
            charactersInString.push('\n');
        } else {
            charactersInString.push(character);
        }

    }
    return charactersInString.join('')
}

const TablatureEditor = () => {
    const navigate = useNavigate()
    let { state } = useLocation()
    const { user } = useContext(UserContext);
    const [isSaving, setIsSaving] = useState(false)
    const [tablature, setTablature] = useState( {
        isPublic: false,
        name: "A tasy lick",
        bars: [],
        tags: [],
        isBassTab: false,
        _id: null
    })

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
            inputs: initTextAreaWithValue(' '),
            dashes: initTextAreaWithValue('-'),
        }

        tablature.bars.push(barTemplate)
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

    // TODO Once a tablature is created, redirect to the show route (/tablature/:id). Reference NewTablature's navigate.
    const handleSaveTablature = () => {
        const idToken = getIdTokenFromUser(user);
        if(tablature._id) {
            setIsSaving(true)
            update(tablature, idToken)
            .then( res => {
                console.log(res)
                setIsSaving(false)
                setTablature( {...tablature} )
            })
        } else {
            setIsSaving(true)
            const { _id, ...tablaturePayload} = tablature
            create(tablaturePayload, idToken)
            .then( res => {
                setIsSaving(false)
                setTablature( res )
                navigate(`/tablature/${res._id}`, { state: res })
            })
        }
    }

    // TODO Only show if tablature is saved to DB (ie has an _id)
    const handleDeleteTablature = () => {
        const idToken = getIdTokenFromUser(user);
        deleteTab(tablature._id, idToken)
        .then( res => {
            console.log(res)
        })
    }

    useEffect(() => {
        if(user) {
            let username = user.username;
            setTablature((prev) => { return {...prev, owner: username} })
        }
    }, [user])

    return (
        <>
            {isSaving
                ? <CircularProgress />
                :
                <>
                    { tablature.bars?.map( 
                        (bar, i) => 
                            <TablatureInput
                                textAreaValues={{
                                    inputs: bar.inputs, 
                                    dashes: bar.dashes
                                }} 
                                handleDeleteBar={handleDeleteBar} 
                                updateBarValues={updateBarValues} 
                                index={i} key={bar._id || bar.label} 
                            /> 
                    )}
                    <button onClick={printAllBars}>Print all bars</button>
                    <button onClick={handleAddBar}>Add bar</button>
                    <button onClick={handleSaveTablature}>Save</button>
                    <button onClick={handleDeleteTablature}>Delete</button>
                </>
            }
        </>
    );
}
 
export default TablatureEditor;