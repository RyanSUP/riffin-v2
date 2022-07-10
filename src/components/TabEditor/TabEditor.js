import { useEffect, useState } from "react";

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

//   ! I'm trying to capture the last key pressed so I can check the key value in the legalChartacters map. 
const getStringFilledWithCharacter = (character) => {
    let valueString = ""
    for(let i = 0; i < 240; i++) {
      if(i%40 === 0 && i !== 0) valueString += '\n'
      valueString += character
    }
    return valueString
  }

const TabEditor = () => {
    // ! Maybe rebuild entire text area each input?
    const [inputTextArea, setInputTextArea] = useState();
    const [inputGridValue, setInputGridValue] = useState();

    function handleChange(e) {
        // Get input key
        // Check against legal keys
        // if legal:
            // Get the position of the cursor
            // Replace space at cursor with key
        const key = e.nativeEvent.data;
        e.preventDefault()  
        if(key in legalCharacters) {
            const cursorPosition = e.target.selectionStart
            let currentValueAsArray =  [...inputGridValue]
            currentValueAsArray[cursorPosition] = key
            const updatedValue = currentValueAsArray.join('')
            setInputGridValue(updatedValue)
        }   
    }

    useEffect(()=> {
        setInputGridValue(getStringFilledWithCharacter(' '))

    }, [])

    return (
        <div id="riffin-editor">
            <textarea 
                value={inputGridValue}
                onChange={handleChange}
                onPaste={(e)=> e.preventDefault()} 
                cols="40" 
                rows="6" 
                maxLength="251" 
                id="riffin-editor-inputGrid"
            >
            </textarea>
        </div> 
    );
}
 
export default TabEditor;