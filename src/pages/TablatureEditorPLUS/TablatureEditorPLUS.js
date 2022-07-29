import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../App';

import Bar from "../../components/Bar/Bar";


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
        if(cursorPosition in mapOfLastColumnIndexes) {
            setCursorPosition((prev) => { return { position: prev.position } })
        } else {
            // ! I might have to update the reference of every bar.
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
    
    // TODO LIST ---
    const deleteTablatureFromDatabase = () => console.log('deleteTablatureFromDatabase')
    const setTablatureInDatabase = () => console.log('setTablatureInDatabase')
    // TODO ^^^^ ---

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
    }

    // Check if the document is new
    useEffect(() => { 
        tablatureDocument['_id'] ? setIsSaved(true) : setIsSaved(false)
    }, [tablatureDocument])

    // Prevent crusor from jumping to end of input.
    useEffect(()=> {
        if(selectedBar) {
            selectedBar.inputRef.current.selectionStart = cursorPosition.position
            selectedBar.inputRef.current.selectionEnd = cursorPosition.position
            console.log('New cursorPosition: ', cursorPosition.position)
        }
    }, [cursorPosition, selectedBar])

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