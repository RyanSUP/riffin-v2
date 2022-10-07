import * as config from './EditorConfig'

/**
 * Calculate the maximum character length of textareas in the block.
 * @param {Number} numberOfCols - How many columns the block has.
 * @param {Number} numberOfStrings - How many rows are in the textarea.
 * @returns The maximum character length.
 */
export const calcTextareaMaxLength = (numberOfCols, numberOfStrings) => (numberOfCols * numberOfStrings) + (numberOfStrings * 2) - 1;

/**
 * Calculates the index values of the first columns of the textarea.
 * @param {Number} numberOfCols - How many columns the block has. 
 * @param {Number} row - The current row.
 * @returns The index of the first column on the given row.
 */
export const calcTextareaFirstColumns = (numberOfCols, row) => (numberOfCols + 1) * (row);

/**
 * Calculates the index values of the last columns of the textarea.
 * @param {Number} numberOfCols - How many columns the block has. 
 * @param {Number} row - The current row.
 * @returns The index of the last column on the given row.
 */
export const calcTextareaLastColumns = (numberOfCols, stringNum, row) => (numberOfCols * stringNum) + row;


/**
 * Updates the textarea values after the block size is changed. Specifically, this function fills in the spaces and dashes when the size is increased, or pops values from the textarea when the size is decreased. It also updates the position of the "|" at the end of the block.
 * TODO This handles multiple things and should be broken down into smaller functions.
 * @param {String} type - the action to perform (increase or decrease the size)
 * @param {String} originalValue - the original textarea value
 * @param {String} characterToFill - the character to fill in the case of increasing size.
 * @param {Number} stepCount - How many columns to add/remove.
 * @returns the adjusted textarea value after size change.
 */
export const generateNewTextareaValueAfterSizeChange = (type, originalValue, characterToFill, stepCount) => {
  const guitarStrings = originalValue.split('\n');
  let newValueString = "";
  for(let i = 0; i < guitarStrings.length; i++) {
    const array = [...guitarStrings[i]];
    for(let j = 0; j < Math.abs(stepCount); j++) {
      if(type === "increaseBlockSize") {
        array[array.length - 1] = characterToFill;
        array.push('|');
      } else {
        array.pop();
        array[array.length - 1] = "|";
      }
    }
    if(i !== guitarStrings.length - 1) { // Last string doesn't need a newline char
      array.push("\n");
    }
    newValueString += array.join("");
  }
  return newValueString;
};

/**
 * Generates a map of the last columns in the textarea
 * @param {Object} action 
 * @returns a map of the last columns in the textarea
 */
export const getMapOfLastColumnIndexes = (action) => {
  const newLastCols = {};
  for(let i = 0; i < action.numberOfStrings; i++) {
    const stringNum = i + 1;
    const newVal = calcTextareaLastColumns(action.cols, stringNum, i);
    newLastCols[newVal] = true;
  }
  return newLastCols;
};

/**
 * Generates a map of the first columns in the textarea
 * @param {Object} action 
 * @returns a map of the first columns in the textarea
 */
export const getMapOfFirstColumnIndexes = (action) => {
  const newFirstCols = {};
  for(let i = 0; i < action.numberOfStrings; i++) {
    const newVal = calcTextareaFirstColumns(action.cols, i);
    newFirstCols[newVal] = true;
  }
  return newFirstCols;
};

/**
 * Creates a new block object defaulted to the DEFAULT_BLOCK_COLS size specified in EditorConfig.
 * @param {Number} numberOfStrings - How many rows the textarea should have. (ie strings on an instrument)
 * @returns a new block object.
 */
export const getNewGuitarBlock = (numberOfStrings = 6) => {
  const action = {
    numberOfStrings: numberOfStrings,
    cols: config.DEFAULT_BLOCK_COLS
  };
  const mapOfFirstColumnIndexes = getMapOfFirstColumnIndexes(action);
  const mapOfLastColumnIndexes = getMapOfLastColumnIndexes(action);
  const mapOfSecondToLastColumnIndexes = Object.keys(mapOfLastColumnIndexes).map((val) => val - 1);
  const initLength = (action.numberOfStrings * action.cols) + (action.numberOfStrings - 1);
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
  const inputs = initTextAreaWithValue(" ");
  const dashes = initTextAreaWithValue("-");
  const maxLength = calcTextareaMaxLength(action.cols, action.numberOfStrings);
  return {
    tempKey: Date() + Math.random(),
    inputs: inputs,
    dashes: dashes,
    cols: config.DEFAULT_BLOCK_COLS,
    maxLength: maxLength,
  };
};

/**
 * Creates the initial tablature object for a new tab
 * @param {number} numberOfStrings 
 * @returns a tablature object
 */
export const getNewTablatureTemplateObject = (numberOfStrings) => {
  const initialBlock = getNewGuitarBlock(numberOfStrings);
  return {
    name: "",
    blocks: [initialBlock],
    tags: [],
    numberOfStrings
  };
};

/**
 * Mainly used for compositional purposes. Creates a selection object with the provided arguments.
 * @param {Number} blockIndex 
 * @param {Ref} blockRef 
 * @returns the selection object
 */
export const generateSelectedBlockObject = (blockIndex, blockRef) => ({ inputRef: blockRef, index: blockIndex });

/**
 * Mainly used for compositional purposes. Creates a cursor object with the provided arguments.
 * @param {Number} selectionStart 
 * @returns the cursorPosition object
 */
export const generateCursorPositionObject = (selectionStart) => ({ position: selectionStart });

/**
 * Checks if the provided key controls movement
 * @param {String} key 
 * @returns true or false depending on if the key is a movement key
 */
export const isMovementKey = (key) => (key in config.MOVEMENT_KEYS);

/**
 * Checks if the key is a legal input (other than arrow keys) and returns the dispatch type associated with that key.
 * @param {String} key 
 * @returns The dispatch type associated with the key, or undegined if the key is not a legal input.
 */
export const getDispatchTypeOfPressedKey = (key) => (key in config.LEGAL_INPUTS) ? config.LEGAL_INPUTS[key] : undefined;

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
};

/**
 * Generates a random key that a block temporarily uses. When the block is saved, tempKey is lost and the block defaults to using _id as an identifier.
 * @returns a randomly generated key
 */
export const generateTempBlockKey = () => Date() + Math.random();