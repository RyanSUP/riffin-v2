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

const TablatureInput = () => {
    const [inputTextAreaValue, setInputTextAreaValue] = useState(initTextAreaWithValue(' '));
    const [dashTextAreaValue, setDashTextAreaValue] = useState(initTextAreaWithValue('-'));
    const [cursor, setCursor] = useState({position: 0});
    const inputRef = useRef();

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
    };

    const arrows = {
        "ArrowDown" : true,
        "ArrowLeft" : true,
        "ArrowRight" : true,
        "ArrowUp" : true,
    };

    function handleClick(e) {
        setCursor( {position: e.target.selectionStart} );
    }

    function handleDuplicate() {
        console.log('duplicate character')
    }

    function handleKeyDown(e) {
        if(e.key in arrows) {
            setCursor( {position: e.target.selectionStart} );
        }
    }

    function handleChange(e) {
        const key = e.nativeEvent.data;
        e.preventDefault();  
        if(key in legalCharacters) {
            legalCharacters[key](key, e.target.selectionStart);
        } else if(key === null) {
            legalCharacters["Backspace"](e.target.selectionStart);
        }  else {
            setCursor((prev) => { return { position: prev.position } })
        }
    }

    function updateInputTextAreaValueAtIndex(newValue, index) {
        let currentValueAsArray =  [...inputTextAreaValue]
        currentValueAsArray[index] = newValue
        const updatedValue = currentValueAsArray.join('')
        setInputTextAreaValue(updatedValue)
    }


    function updateDashTextAreaValueAtIndex(newValue, index) {
        let currentValueAsArray =  [...dashTextAreaValue]
        currentValueAsArray[index] = newValue
        const updatedValue = currentValueAsArray.join('')
        setDashTextAreaValue(updatedValue)
    }


    function handleAddCharacter(char) {
        if(cursor.position in mapOfLastColumnIndexes) {
            setCursor((prev) => { return { position: prev.position } })
        } else {
            updateInputTextAreaValueAtIndex(char, cursor.position)
            updateDashTextAreaValueAtIndex(" ", cursor.position)
            setCursor( { position: cursor.position + 1 } )
        }
    }

    function handleRemoveCharacter() {
        if(cursor.position in mapOfFirstColumnIndexes) {
            setCursor( { position: cursor.position } )
        } else {
            let newCursorPosition = cursor.position - 1
            updateDashTextAreaValueAtIndex("-", newCursorPosition)
            updateInputTextAreaValueAtIndex(" ", newCursorPosition)
            setCursor( {position: newCursorPosition} )
        }
    }

    function handleSave(e) {
        e.preventDefault()
        printAllTextAreaValues()

    }

    function printAllTextAreaValues() {
        console.log('==== New Print ====')
        console.log(inputTextAreaValue)
        console.log(dashTextAreaValue)
        console.log('==== Merged ====')
        
        let mergedValues = Array(245)
        if(inputTextAreaValue.length !== dashTextAreaValue.length) {
            console.error('input and dash lengths do not match')
        } else {
            let inputValueAsArray = inputTextAreaValue.split('')
            let dashValueAsArray = dashTextAreaValue.split('')
            for(let i = 0; i < 245; i++) {
                if (inputValueAsArray[i] === " ") {
                    mergedValues.push(dashValueAsArray[i])
                } else {
                    mergedValues.push(inputValueAsArray[i])
                }
            }
        }

        console.log(mergedValues.join(''))
        console.log("=== END ===")

    }

    useEffect(()=> {
        inputRef.current.selectionStart = cursor.position
        inputRef.current.selectionEnd = cursor.position
        console.log('New cursorPosition: ', cursor.position)
    }, [cursor])


    return (
        <form id="riffin-editor">
            <textarea
                style={{resize: "none"}}
                value={inputTextAreaValue}
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
            <textarea
                readOnly={true}
                style={ {resize: "none"} }
                value={dashTextAreaValue}
                cols="40" 
                rows="6" 
                maxLength="251" 
                id="riffin-editor-dashGrid"
            >
            </textarea>
            <button onClick={handleSave}>Save</button>
        </form> 
    );
}
 
export default TablatureInput;