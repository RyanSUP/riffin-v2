import { useEffect, useState, useRef } from "react";


const firstColumnIndexes = [0, 41, 82, 123, 164, 205]
const lastColumnIndexes =  [40, 81, 122, 163, 204]
const secondToLastCol = [39, 80, 121, 162, 203]
const LAST_INPUT_POSITION = 245

const getStringFilledWithCharacter = (character) => {
    let charactersInString = [];
    for(let i = 0; i < 245; i++) {
        charactersInString.push(character);
    }
    lastColumnIndexes.forEach((index) => charactersInString[index] = "\n" );
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

    function handleAddCharacter(char, selectionStart) {
        console.log('ss', selectionStart)
        console.log('c', cursor.position)
        if(cursor.position === LAST_INPUT_POSITION) {
            setCursor( {position: LAST_INPUT_POSITION} )
        } else if(lastColumnIndexes.includes(cursor.position)) {
            setCursor( {position: selectionStart - 1} )
        } else {
            let currentValueAsArray =  [...inputGridValue]
            currentValueAsArray[cursor.position] = char
            const updatedValue = currentValueAsArray.join('')
            setInputGridValue(updatedValue)
            setCursor( {position: selectionStart} )
        }
    }

    function handleRemoveCharacter(selectionStart) {
        console.log('removing')
        if(firstColumnIndexes.includes(selectionStart)) return
        let currentValueAsArray =  [...inputGridValue]
        currentValueAsArray[selectionStart] = " "
        const updatedValue = currentValueAsArray.join('')
        setInputGridValue(updatedValue)
        setCursor( {position: selectionStart} )
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