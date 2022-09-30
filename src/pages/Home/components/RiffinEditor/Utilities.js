import { DEFAULT_BLOCK_COLS, MIN_BLOCK_COLS, MAX_BLOCK_COLS, MOVEMENT_KEYS, LEGAL_INPUTS } from './EditorConfig'

const calcNewMaxLength = (numberOfCols, numberOfStrings) => (numberOfCols * numberOfStrings) + (numberOfStrings * 2) - 1
const calculateNewFirstCol = (numberOfCols, index) => (numberOfCols + 1) * (index)
const calculateNewLastCol = (numberOfCols, stringNum, index) => (numberOfCols * stringNum) + index

/* 
  Needs an actions object with the following properties:
  area
  characterToAdd
  action
  cols,
  stepCount
*/
export const updateBlockValue = (action) => {
  if((action.type === "increase" && action.cols === MAX_BLOCK_COLS) ||
    (action.type === "decrease" && action.cols === MIN_BLOCK_COLS)) {
    return action.area
  }

  const guitarStrings = action.area.split('\n')
  let newValueString = ""
  for(let i = 0; i < guitarStrings.length; i++) {
    const array = [...guitarStrings[i]]
    for(let j = 0; j < Math.abs(action.stepCount); j++) {
      if(action.type === "increase") {
        array[array.length - 1] = action.characterToAdd
        array.push('|')
      } else {
        array.pop()
        array[array.length - 1] = "|"
      }
    }
    if(i !== guitarStrings.length - 1) { // Last string doesn't need a newline char
      array.push("\n")
    }
    newValueString += array.join("")
  }
  return newValueString
}

/* 
  action {
    cols,
    maxLength,
    action,
    stringCount,
    stepCount
  }
*/
export const updateTextAreaAttributes = (action) => {
  if((action.type === "increase" && action.cols === MAX_BLOCK_COLS) ||
    (action.type === "decrease" && action.cols === MIN_BLOCK_COLS)) {
    return {
      cols: action.cols,
      maxLength: action.maxLength
    }
  }

  return {
    cols: action.cols + action.stepCount,
    maxLength: calcNewMaxLength(action.cols + action.stepCount, action.stringCount)
  }

}

export const getMapOfLastColumnIndexes = (action) => {
  const newLastCols = {}
  for(let i = 0; i < action.stringCount; i++) {
    const stringNum = i + 1
    const newVal = calculateNewLastCol(action.cols, stringNum, i)
    newLastCols[newVal] = true
  }
  return newLastCols
}

export const getMapOfFirstColumnIndexes = (action) => {
  const newFirstCols = {}
  for(let i = 0; i < action.stringCount; i++) {
    const newVal = calculateNewFirstCol(action.cols, i)
    newFirstCols[newVal] = true
  }
  return newFirstCols
}

// TODO Rename to createNewBlock
export const getNewGuitarBlock = (stringCount = 6) => {
  const action = {
    stringCount: stringCount,
    cols: DEFAULT_BLOCK_COLS
  }
  const mapOfFirstColumnIndexes = getMapOfFirstColumnIndexes(action)
  const mapOfLastColumnIndexes = getMapOfLastColumnIndexes(action)
  const mapOfSecondToLastColumnIndexes = Object.keys(mapOfLastColumnIndexes).map((val) => val - 1)
  const initLength = (action.stringCount * action.cols) + (action.stringCount - 1)
  const initTextAreaWithValue = (character) => {
    let charactersInString = [];
    for (let i = 0; i < initLength; i++) {
      if (i in mapOfLastColumnIndexes) {
        charactersInString.push("\n");
      } else if (i in mapOfFirstColumnIndexes || mapOfSecondToLastColumnIndexes.includes(i)) {
        charactersInString.push("|");
      } else {
        charactersInString.push(character);
      }
    }
    return charactersInString.join("");
  };
  const inputs = initTextAreaWithValue(" ")
  const dashes = initTextAreaWithValue("-")
  const maxLength = calcNewMaxLength(action.cols, action.stringCount)
  return {
    tempKey: Date() + Math.random(),
    inputs: inputs,
    dashes: dashes,
    cols: DEFAULT_BLOCK_COLS,
    maxLength: maxLength,
    numberOfStrings: stringCount
  };
}

// ----------------------------------------------------------------

/**
 * Creates the initial tablature object for a new tab
 * @param {number} numberOfStrings 
 * @returns a tablature object
 */
export const getNewTablatureTemplateObject = (numberOfStrings) => {
  const initialBlock = getNewGuitarBlock(numberOfStrings);
  return {
    name: "A tasty lick",
    blocks: [initialBlock],
    tags: [],
    numberOfStrings
  }
}

/**
 * Mainly used for compositional purposes. Creates a selection object with the provided arguments.
 * @param {Number} blockIndex 
 * @param {Ref} blockRef 
 * @returns the selection object
 */
export const generateSelectedBlockObject = (blockIndex, blockRef) => ({ inputRef: blockRef, index: blockIndex })

/**
 * Mainly used for compositional purposes. Creates a cursor object with the provided arguments.
 * @param {Number} selectionStart 
 * @returns the cursorPosition object
 */
export const generateCursorPositionObject = (selectionStart) => ({ position: selectionStart })

/**
 * Checks if the provided key controls movement
 * @param {String} key 
 * @returns true or false depending on if the key is a movement key
 */
export const isMovementKey = (key) => (key in MOVEMENT_KEYS)

/**
 * Checks if the key is a legal input (other than arrow keys) and returns the dispatch type associated with that key.
 * @param {String} key 
 * @returns The dispatch type associated with the key, or undegined if the key is not a legal input.
 */
export const getDispatchTypeOfPressedKey = (key) => (key in LEGAL_INPUTS) ? LEGAL_INPUTS[key] : undefined

/**
 * Replaces a character in the provided string at the specified position.
 * @param {String} originalInputs
 * @param {String} character 
 * @param {Number} position 
 * @returns a new string with the replacement character inserted
 */
export const replaceTextareaValue = (textAreaValue, character, position) => {
  let arrayOfCharacters = [...textAreaValue];
  arrayOfCharacters[position] = character;
  return arrayOfCharacters.join("");
}

const getPositionsAboveSelection = (selectionStart, cols) => {
  let arrayOfPositions = []
  const indexGapBetweenStrings = cols + 1 // The + 1 compensates for the hidden \n
  for(let position = selectionStart - indexGapBetweenStrings; position >= 0; position -= indexGapBetweenStrings) {
    arrayOfPositions.push(position - 1)
  }
  return arrayOfPositions
}

const getPositionsBelowSelection = (selectionStart, cols, editableLength) => {
  const indexGapBetweenStrings = cols + 1 // The + 1 compensates for the hidden \n
  let arrayOfPositions = []
  for(let position = selectionStart + indexGapBetweenStrings; position <= editableLength; position += indexGapBetweenStrings) {
    arrayOfPositions.push(position - 1)
  }
  return arrayOfPositions
}

export const getPositionsToDuplicate = (selectionStart, cols, maxLength, numberOfStrings) => {
  let numberOfEditablePositionsOnBlock = maxLength - numberOfStrings
  let positionsAboveSelection = getPositionsAboveSelection(selectionStart - 1, cols)
  let positionsBelowSelection = getPositionsBelowSelection(selectionStart - 1, cols, numberOfEditablePositionsOnBlock)
  let allPositionsToDuplicate = [selectionStart - 2, ...positionsAboveSelection, ...positionsBelowSelection]
  return allPositionsToDuplicate
}

// function handleDuplicateChord(mapOfFirstColumnIndexes, mapOfLastColumnIndexes) {

//   const selectedBlock = tablature.blocks[selectedTablatureBlock.index]
//   // 4) get positions to duplicate
//   let positionsToDuplicate = getPositionsToDuplicate(cursorPosition.position, selectedBlock.cols, (selectedBlock.maxLength - tablature.numberOfStrings))

//   // 5) check if a duplication occurs
//   if(positionsToDuplicate.length === 0) {
//     return
//   }

//   // 6) replace characters
//   let inputsAsArray = [...selectedBlock.inputs]
//   positionsToDuplicate.forEach(pos => {
//     const characterToDuplicate = inputsAsArray[pos]
//     selectedBlock.inputs = getUpdatedTextAreaValues(
//       "inputs",
//       characterToDuplicate,
//       pos + 2
//     )
//     selectedBlock.dashes = getUpdatedTextAreaValues(
//       "dashes",
//       (characterToDuplicate !== " ") ? " " : "-",
//       pos + 2
//     )
//   })

//   // 7) set cursor and tablature
//   setCursorPosition({ position: cursorPosition.position + 2 })
//   refreshTablatureObject()
// }