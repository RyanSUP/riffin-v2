import { useEffect, useState, useRef } from "react";

const handleAddCharacter = () => {
    console.log('add character')
}
const handleDuplicate = () => {
    console.log('duplicate character')
}
const handleRemoveCharacter = () => {
    console.log('Remove character')
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
    "d": handleDuplicate, // duplicate
    "Backspace" : handleRemoveCharacter,
  }
  const arrows = {
    "ArrowDown" : true,
    "ArrowLeft" : true,
    "ArrowRight" : true,
    "ArrowUp" : true,
  }
const getStringFilledWithCharacter = (character) => {
    let valueString = ""
    for(let i = 0; i < 240; i++) {
      if(i%40 === 0 && i !== 0) valueString += '\n'
      valueString += character
    }
    return valueString
  }

const TabEditor = () => {
    const [inputGridValue, setInputGridValue] = useState(getStringFilledWithCharacter(' '));
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef()

    function handleClick(e) {
        setCursorPosition(e.target.selectionStart)
    }

    function handleKeyDown(e) {
        if(e.key in arrows) {
            console.log(e.key, ' in arrows')
            console.log('e.target.selectionStart: ', e.target.selectionStart)
            setCursorPosition(e.target.selectionStart)
        }
    }

    function handleChange(e) {
        // Get input key
        // Check against legal keys
        // if legal:
            // Get the position of the cursor
            // Replace space at cursor with key
        const key = e.nativeEvent.data;
        console.log('OnChange', e)
        e.preventDefault()  
        if(key in legalCharacters) {
            let currentValueAsArray =  [...inputGridValue]
            currentValueAsArray[cursorPosition] = key
            const updatedValue = currentValueAsArray.join('')
            setInputGridValue(updatedValue)
        }   
        setCursorPosition(e.target.selectionStart)
    }

    useEffect(()=> {
        inputRef.current.selectionStart = cursorPosition
        inputRef.current.selectionEnd = cursorPosition
        console.log('New cursorPosition: ', cursorPosition)
    }, [cursorPosition])

    return (
        <div id="riffin-editor">
            <textarea
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
        </div> 
    );
}
 
export default TabEditor;