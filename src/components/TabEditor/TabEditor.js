import { useEffect, useState, useRef } from "react";

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

const LAST_INPUT_POSITION = 245

const getStringFilledWithCharacter = (character) => {
    let charactersInString = [];
    for(let i = 0; i < 245; i++) {
        if(mapOfLastColumnIndexes[i]) {
            charactersInString.push('\n');
        } else {
            charactersInString.push(character);
        }

    }
    return charactersInString.join('')
  }

const TabEditor = () => {
useEffect(()=> {
    console.log('remount')
})
const handleDuplicate = () => {
    console.log('duplicate character')
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
    const [inputGridValue, setInputGridValue] = useState(getStringFilledWithCharacter(' '));
    const [cursor, setCursor] = useState({position: 0});
    const inputRef = useRef();

    function handleClick(e) {
        setCursor( {position: e.target.selectionStart} );
    }


    function handleKeyDown(e) {
        if(e.key in arrows) {
            setCursor( {position: e.target.selectionStart} );
        }
    }

    function handleChange(e) {
        const key = e.nativeEvent.data;
        // console.log('OnChange', e);
        // e.preventDefault();  
        if(key in legalCharacters) {
            legalCharacters[key](key, e.target.selectionStart);
        } else if(key === null) {
            legalCharacters["Backspace"](e.target.selectionStart);
        }  
    }

    function handleAddCharacter(char) {
        if(cursor.position === LAST_INPUT_POSITION) {
            setCursor( {position: LAST_INPUT_POSITION} )
        } else if(mapOfLastColumnIndexes[cursor.position]) {
            setCursor((prev) => { return { position: prev.position } })
        } else {
            let currentValueAsArray =  [...inputGridValue]
            currentValueAsArray[cursor.position] = char
            const updatedValue = currentValueAsArray.join('')
            setInputGridValue(updatedValue)
            setCursor((prev) => { return { position: prev.position + 1 } })
        }
    }

    function handleRemoveCharacter() {
        if(mapOfFirstColumnIndexes[cursor.position]) {
            console.log('backspace: includes first position')
            setCursor( { position: cursor.position } )
        } else {
            let newCursorPosition = cursor.position - 1
            let currentValueAsArray =  [...inputGridValue]
            currentValueAsArray[newCursorPosition] = " "
            const updatedValue = currentValueAsArray.join('')
            setInputGridValue(updatedValue)
            setCursor( {position: newCursorPosition} )
        }
    }

    function printValue() {
        console.dir(inputRef.current)
    }

    useEffect(()=> {
        inputRef.current.selectionStart = cursor.position
        inputRef.current.selectionEnd = cursor.position
        console.log('New cursorPosition: ', cursor.position)
    }, [cursor])


    return (
        <div id="riffin-editor">
            <textarea
                style={{resize: "none"}}
                value={inputGridValue}
                onChange={handleChange}
                onKeyUp={handleKeyDown}
                onPaste={(e)=> e.preventDefault()} 
                onClick={handleClick}
                cols="40" 
                rows="6" 
                maxLength="251" 
                id="riffin-editor-inputGrid"
                ref={inputRef}
            >
            </textarea>
            <button onClick={printValue}>Print value</button>
        </div> 
    );
}
 
export default TabEditor;