import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../App';

import Bar from "../../components/Bar/Bar";
import { update } from "../../services/tablatureServices";

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
    "~": "handleAddCharacter", // vibrato
    "/": "handleAddCharacter", // slide
    "^": "handleAddCharacter", // bend
    "x": "handleAddCharacter", // mute
    "p": "handleAddCharacter", // pull off
    "h": "handleAddCharacter", // hammer on
    "0": "handleAddCharacter",
    "1": "handleAddCharacter",
    "2": "handleAddCharacter",
    "3": "handleAddCharacter",
    "4": "handleAddCharacter",
    "5": "handleAddCharacter",
    "6": "handleAddCharacter",
    "7": "handleAddCharacter",
    "8": "handleAddCharacter",
    "9": "handleAddCharacter",
    "d": "handleAddCharacter", // duplicate
    "Backspace" : "handleRemoveCharacter",
}

const arrows = {
    "ArrowDown" : true,
    "ArrowLeft" : true,
    "ArrowRight" : true,
    "ArrowUp" : true,
}

// pure function that takes in the selectedBar object, cursorPosition and event, and returns an updated bar object.
const updateSelectedBar = (selectedBarObject, cursorPosition, event) => {



}

const TablatureEditorPLUS = () => {
    const [selectedBar, setSelectedBar] = useState(null)
    const [cursorPosition, setCursorPosition] = useState( {position: null} ) // This can't be a number or it will cause referenceing errors.
    const [isSaved, setIsSaved] = useState(null)
    const [tablatureDocument, setTablatureDocument] = useState({
        isPublic: false,
        name: "A tasy lick",
        bars: [],
        tags: [],
        isBassTab: false,
    })
    
    const { user } = useContext(UserContext)
    // TODO LIST ---
    const deleteTablatureFromDatabase = () => console.log('deleteTablatureFromDatabase')
    const setTablatureInDatabase = () => console.log('setTablatureInDatabase')
    const setBarInTablature = () => console.log('setBarInTablature')
    // TODO ^^^^ ---
    const handleKeyUpInBar = () => console.log('handleKeyUpInBar')    
    
    const handleClickedBar = (event, barIndex) => {
        setSelectedBar(barIndex)
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
    }

    // Check if the document is new
    useEffect(() => { 
        tablatureDocument['_id'] ? setIsSaved(true) : setIsSaved(false)
    }, [tablatureDocument])

    return (
        <>
            <button onClick={addBarToTablature}>Add bar</button>
            {tablatureDocument.bars.map( (bar, i) =>
                <>
                    <Bar 
                        key={bar.label} // TODO Get unique id form database for key
                        index={i}
                        bar={bar}
                        setBarInTablature={setBarInTablature}
                        handleClickedBar={handleClickedBar}
                        handleKeyUpInBar={handleKeyUpInBar}
                    />
                    <button onClick={ () => deleteBarFromTablature(i) }>Delete bar</button>
                </>
            )}
        </>
        
    );
}
 
export default TablatureEditorPLUS;