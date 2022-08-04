import { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { UserContext } from '../../App'
import * as tablatureServices from "../../services/tablatureServices"
import * as userUtils from "../../utils/userUtils"
import Bar from "../../components/Bar/Bar"
import { CircularProgress } from '@mui/material';



const TablatureEditorPLUS = () => {
    const [incrementId, setIncrementId] = useState(0)
    const [selectedBar, setSelectedBar] = useState(null)
    const [cursorPosition, setCursorPosition] = useState( {position: null} ) // This can't be a number or it will cause referenceing errors.
    const [isSaved, setIsSaved] = useState(null) // Is the document already in the database
    const [isLoading, setIsLoading] = useState(false) // is the document currently waiting for a response
    const [tablatureDocument, setTablatureDocument] = useState({
        isPublic: false,
        name: "A tasy lick",
        bars: [],
        tags: [],
        isBassTab: false,
    })


    const { user } = useContext(UserContext)
    const { id } = useParams()
    let navigate = useNavigate()

    const mapOfFirstColumnIndexes = {
        0: true,
        41: true,
        82: true,
        123: true,
        164: true,
        205: true,
    }
    
    const mapOfLastColumnIndexes = {
        40: true,
        81: true,
        122: true,
        163: true,
        204: true,
        245: true,
    }
    
    const legalCharacters = {
        "~": handleAddCharacter, // vibrato
        "/": handleAddCharacter, // slide
        "^": handleAddCharacter, // bend
        "x": handleAddCharacter, // mute
        "p": handleAddCharacter, // pull off
        "h": handleAddCharacter, // hammer on
        "0": handleAddCharacter,
        "1": handleAddCharacter,
        "2": handleAddCharacter,
        "3": handleAddCharacter,
        "4": handleAddCharacter,
        "5": handleAddCharacter,
        "6": handleAddCharacter,
        "7": handleAddCharacter,
        "8": handleAddCharacter,
        "9": handleAddCharacter,
        "d": handleAddCharacter, // duplicate
        "Backspace" : handleRemoveCharacter,
    }
    
    const arrows = {
        "ArrowDown" : true,
        "ArrowLeft" : true,
        "ArrowRight" : true,
        "ArrowUp" : true,
    }

    function getUpdatedTextAreaValues(area, character, insertionIndex) {
        const bar = tablatureDocument.bars[selectedBar.index]
        let currentValueAsArray =  [...bar[area]]
        currentValueAsArray[insertionIndex] = character
        const updatedValue = currentValueAsArray.join('')
        return updatedValue
    }

    function handleAddCharacter(character) {
        if(cursorPosition.position in mapOfLastColumnIndexes) {
            setCursorPosition((prev) => { return { position: prev.position } })
        } else {
            const bar = tablatureDocument.bars[selectedBar.index]
            const newBar = { ...bar }
            newBar.inputs = getUpdatedTextAreaValues('inputs', character, cursorPosition.position)
            newBar.dashes = getUpdatedTextAreaValues('dashes', ' ', cursorPosition.position)
            tablatureDocument.bars[selectedBar.index] = newBar
            setTablatureDocument( {...tablatureDocument} )
            setCursorPosition( { position: cursorPosition.position + 1 } )
        }
    }

    function handleRemoveCharacter() {
        if(cursorPosition.position in mapOfFirstColumnIndexes) {
            setCursorPosition((prev) => { return { position: prev.position } })
        } else {
            const bar = tablatureDocument.bars[selectedBar.index]
            const newBar = { ...bar }
            let newCursorPosition = cursorPosition.position - 1
            newBar.inputs = getUpdatedTextAreaValues('inputs', ' ', newCursorPosition)
            newBar.dashes = getUpdatedTextAreaValues('dashes', ' ', newCursorPosition)
            tablatureDocument.bars[selectedBar.index] = newBar
            setTablatureDocument( {...tablatureDocument} )
            setCursorPosition( {position: newCursorPosition} )
        }
    }
    
    const deleteTablatureFromDatabase = () => {
        const idToken = userUtils.getIdTokenFromUser(user);
        tablatureServices.delete(tablatureDocument._id, idToken)
        .then( res => {
            console.log(res)
        })
        // TODO Delete tablature from state
        // TODO Navigate to trending
    }

    const setTablatureInDatabase = () => {
        const idToken = userUtils.getIdTokenFromUser(user);
        if(tablatureDocument._id) {
            setIsLoading(true)
            tablatureServices.update(tablatureDocument, idToken)
            .then( res => {
                console.log(res)
                setIsLoading(false)
                setTablatureDocument( {...tablatureDocument} )
            })
            // TODO Update tablature in state
        } else {
            setIsLoading(true)
            const { _id, ...tablaturePayload} = tablatureDocument
            tablatureServices.create(tablaturePayload, idToken)
            .then( tablatureFromResponse => {
                setIsLoading(false)
                navigate(`/tablature/${tablatureFromResponse._id}`)
            })
            // TODO Add tablature to state
        }
    }

    const setBarInTablature = (event) => {
        const key = event.nativeEvent.data;
        event.preventDefault();  
        if(key in legalCharacters) {
            legalCharacters[key](key)
        } else if(key === null) {
            legalCharacters["Backspace"]();
        }  else {
            setCursorPosition((prev) => { return { position: prev.position } })
        }
    }

    const handleKeyUpInBar = (event) => {
        if(event.key in arrows) {
            setCursorPosition( {position: event.target.selectionStart} );
        }
    }  
    
    const handleClickedBar = (event, barIndex, barRef) => {
        setSelectedBar( {inputRef: barRef, index: barIndex} )
        setCursorPosition( {position: event.target.selectionStart} );
    }

    const deleteBarFromTablature = (barIndex) => {
        const newBars = []
        tablatureDocument.bars.forEach( (bar, i) => {
            if(barIndex !== i) {
                newBars.push( {...bar} )
            }
        })

        tablatureDocument.bars = newBars
        setTablatureDocument( {...tablatureDocument} )
    }
    
    // TODO This function needs to get a unique id for each bar, that way the keys are unique.
    const addBarToTablature = () => {
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

        const previousBars = []
        tablatureDocument.bars.forEach( (bar) => {
            previousBars.push( {...bar} )
        })

        const newBar = {
            label: `Bar ${tablatureDocument.bars.length + 1}`,
            inputs: initTextAreaWithValue(' '),
            dashes: initTextAreaWithValue('-'),
        }

        tablatureDocument.bars = [...previousBars, newBar]
        setTablatureDocument( { ...tablatureDocument } )
        setIncrementId( incrementId + 1)
        console.log(incrementId)
    }

    // Check if the document is new
    useEffect(() => { 
        tablatureDocument['_id'] ? setIsSaved(true) : setIsSaved(false)
    }, [tablatureDocument])

    useEffect(() => {
        if(id) {
            tablatureServices.getTablatureById(id)
            .then( res => {
                if(res["error"]) {
                    // TODO Navigate back to where the user came from
                    navigate(`/trending`)
                }
                setTablatureDocument(res.tablature)
            })
        }
    },[id])


    // Prevent crusor from jumping to end of input.
    useEffect(()=> {
        if(selectedBar) {
            selectedBar.inputRef.current.selectionStart = cursorPosition.position
            selectedBar.inputRef.current.selectionEnd = cursorPosition.position
            console.log('New cursorPosition: ', cursorPosition.position)
        }
    }, [cursorPosition, selectedBar])

    useEffect(() => {
        if(user) {
            let username = user.username;
            setTablatureDocument((prev) => { return {...prev, owner: username} })
        }
    }, [user])

    return (
        <>
            {isLoading ? <CircularProgress /> : 
                <>
                    <button onClick={addBarToTablature}>Add bar</button>
                    {tablatureDocument.bars.map( (bar, i) =>
                        <div key={incrementId}>
                            <Bar 
                                index={i}
                                bar={bar}
                                setBarInTablature={setBarInTablature}
                                handleClickedBar={handleClickedBar}
                                handleKeyUpInBar={handleKeyUpInBar}
                            />
                            <button onClick={ () => deleteBarFromTablature(i) }>Delete bar</button>
                        </div>
                    )}
                    <button onClick={setTablatureInDatabase}>Save Tablature</button>
                    {isSaved &&
                        <button onClick={deleteTablatureFromDatabase}>Delete tablature</button>
                    }
                </>
            }
        </>
        
    );
}
 
export default TablatureEditorPLUS;