import { useEffect, useState, useRef } from "react";


const getStringFilledWithCharacter = (character) => {
    let valueString = ""
    for(let i = 0; i < 240; i++) {
      if(i%40 === 0 && i !== 0) valueString += '\n'
      valueString += character
    }
    return valueString
  }

const TabEditor = () => {

const handleDuplicate = () => {
    console.log('duplicate character')
}

const firstColumnIndexes = [0, 41, 82, 123, 164, 205]
const lastColumnIndexes =  [40, 81, 122, 163, 204]
const secondToLastCol = [39, 80, 121, 162, 203]
const LAST_INPUT_POSITION = 245

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
    const [inputGridValue, setInputGridValue] = useState(getStringFilledWithCharacter(' '));
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef()

    function handleClick(e) {
        setCursorPosition(e.target.selectionStart)
    }


    function handleKeyDown(e) {
        if(e.key in arrows) {
            setCursorPosition(e.target.selectionStart)
        }
    }

    function handleChange(e) {
        const key = e.nativeEvent.data;
        console.log('OnChange', e)
        e.preventDefault()
        if(key in legalCharacters) {
            legalCharacters[key](key, e.target.selectionStart)
        } else if(key === null) {
            legalCharacters["Backspace"](e.target.selectionStart)
        }  
    }

    function handleAddCharacter(char, selectionStart) {
        if(cursorPosition === LAST_INPUT_POSITION) {
            console.log('Cursor at last input position (245)')
        } else if(lastColumnIndexes.includes(cursorPosition)) {
            console.log('Curson on the last column')
        } else {
            let currentValueAsArray =  [...inputGridValue]
            currentValueAsArray[cursorPosition] = char
            const updatedValue = currentValueAsArray.join('')
            setInputGridValue(updatedValue)
            setCursorPosition(selectionStart)
        }
    }

    function handleRemoveCharacter(selectionStart) {
        console.log('removing')
        if(firstColumnIndexes.includes(selectionStart)) return
        let currentValueAsArray =  [...inputGridValue]
        currentValueAsArray[selectionStart] = " "
        const updatedValue = currentValueAsArray.join('')
        setInputGridValue(updatedValue)
        setCursorPosition(selectionStart)
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