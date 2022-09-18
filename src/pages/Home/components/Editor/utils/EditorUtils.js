import { DEFAULT_BLOCK_COLS, MIN_BLOCK_COLS, MAX_BLOCK_COLS } from '../EditorConfig'

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
        array.push(action.characterToAdd)
      } else {
        array.pop()
      }
    }
    if(i !== guitarStrings.length - 1) {
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

export const getNewGuitarBlock = () => {
  const action = {
    stringCount: 6,
    cols: DEFAULT_BLOCK_COLS
  }

  const mapOfLastColumnIndexes = getMapOfLastColumnIndexes(action)

  const initTextAreaWithValue = (character) => {
    let charactersInString = [];
    for (let i = 0; i < 245; i++) {
      if (i in mapOfLastColumnIndexes) {
        charactersInString.push("\n");
      } else {
        charactersInString.push(character);
      }
    }
    return charactersInString.join("");
  };
  const inputs = initTextAreaWithValue(" ")
  const dashes = initTextAreaWithValue("-")
  console.log('max length test from utils: ', inputs.length)
  return {
    tempKey: Date() + Math.random(),
    inputs: inputs,
    dashes: dashes,
    cols: DEFAULT_BLOCK_COLS,
    maxLength: 251
  };
}