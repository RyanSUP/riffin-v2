import { DEFAULT_BLOCK_COLS, MIN_BLOCK_COLS, MAX_BLOCK_COLS, MOVEMENT_KEYS, LEGAL_INPUTS } from './EditorConfig'

export const calcNewMaxLength = (numberOfCols, numberOfStrings) => (numberOfCols * numberOfStrings) + (numberOfStrings * 2) - 1
export const calculateNewFirstCol = (numberOfCols, index) => (numberOfCols + 1) * (index)
export const calculateNewLastCol = (numberOfCols, stringNum, index) => (numberOfCols * stringNum) + index


export const generateNewTextareaValueAfterSizeChange = (type, originalValue, characterToFill, stepCount, cols) => {
  // * Move to dispatcher when replacing guts with callback
  if((type === "increaseBlockSize" && cols === MAX_BLOCK_COLS) ||
    (type === "decreateBlockSize" && cols === MIN_BLOCK_COLS)) {
    return originalValue;
  }
  const guitarStrings = originalValue.split('\n')
  let newValueString = ""
  for(let i = 0; i < guitarStrings.length; i++) {
    const array = [...guitarStrings[i]]
    for(let j = 0; j < Math.abs(stepCount); j++) {
      // * Replace with a callback?
      if(type === "increaseBlockSize") {
        array[array.length - 1] = characterToFill
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
  Needs an actions object with the following properties:
  area
  characterToAdd
  action
  cols,
  stepCount
*/
export const updateBlockValue = (action) => {
  if((action.type === "increaseBlockSize" && action.cols === MAX_BLOCK_COLS) ||
    (action.type === "decreateBlockSize" && action.cols === MIN_BLOCK_COLS)) {
    return action.area
  }

  const guitarStrings = action.area.split('\n')
  let newValueString = ""
  for(let i = 0; i < guitarStrings.length; i++) {
    const array = [...guitarStrings[i]]
    for(let j = 0; j < Math.abs(action.stepCount); j++) {
      if(action.type === "increaseBlockSize") {
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
    numberOfStrings,
    stepCount
  }
*/
export const generateNewSizePropertiesAfterSizeChange = (type, block, stepCount, numberOfStrings) => {
  if((type === "increaseBlockSize" && block.cols === MAX_BLOCK_COLS) ||
    (type === "decreateBlockSize" && block.cols === MIN_BLOCK_COLS)) {
    return {
      cols: block.cols,
      maxLength: block.maxLength
    }
  }

  return {
    cols: block.cols + stepCount,
    maxLength: calcNewMaxLength(block.cols + stepCount, numberOfStrings)
  }
}

export const getMapOfLastColumnIndexes = (action) => {
  const newLastCols = {}
  for(let i = 0; i < action.numberOfStrings; i++) {
    const stringNum = i + 1
    const newVal = calculateNewLastCol(action.cols, stringNum, i)
    newLastCols[newVal] = true
  }
  return newLastCols
}

export const getMapOfFirstColumnIndexes = (action) => {
  const newFirstCols = {}
  for(let i = 0; i < action.numberOfStrings; i++) {
    const newVal = calculateNewFirstCol(action.cols, i)
    newFirstCols[newVal] = true
  }
  return newFirstCols
}

// TODO Rename to createNewBlock
export const getNewGuitarBlock = (numberOfStrings = 6) => {
  const action = {
    numberOfStrings: numberOfStrings,
    cols: DEFAULT_BLOCK_COLS
  }
  const mapOfFirstColumnIndexes = getMapOfFirstColumnIndexes(action)
  const mapOfLastColumnIndexes = getMapOfLastColumnIndexes(action)
  const mapOfSecondToLastColumnIndexes = Object.keys(mapOfLastColumnIndexes).map((val) => val - 1)
  const initLength = (action.numberOfStrings * action.cols) + (action.numberOfStrings - 1)
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
  const maxLength = calcNewMaxLength(action.cols, action.numberOfStrings)
  return {
    tempKey: Date() + Math.random(),
    inputs: inputs,
    dashes: dashes,
    cols: DEFAULT_BLOCK_COLS,
    maxLength: maxLength,
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

export const generateTempBlockKey = () => Date() + Math.random()