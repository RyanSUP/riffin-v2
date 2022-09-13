import { STEP_COUNT, MIN_BLOCK_COLS, MAX_BLOCK_COLS } from '../EditorConfig'

const calcNewMaxLength = (numberOfCols, numberOfStrings) => (numberOfCols * numberOfStrings) + (numberOfStrings * 2) - 1
const calculateNewFirstCol = (numberOfCols, index) => (numberOfCols + 1) * (index)
const calculateNewLastCol = (numberOfCols, stringNum, index) => (numberOfCols * stringNum) + index

/* 
  Needs an actions object with the following properties:
  area
  characterToAdd
  action
  cols
*/
export const updateBlockValue = (action) => {
  if((action.action === "increase" && action.cols === MAX_BLOCK_COLS) ||
    (action.action === "decrease" && action.cols === MIN_BLOCK_COLS)) {
    return action.area
  }

  const guitarStrings = action.area.split('\n')
  let newValueString = ""
  for(let i = 0; i < guitarStrings.length; i++) {
    const array = [...guitarStrings[i]]
    for(let j = 0; j < STEP_COUNT; j++) {
      if(action.action === "increase") {
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
    stringCount
  }
*/
export const updateTextAreaAttributes = (action) => {
  if((action.action === "increase" && action.cols === MAX_BLOCK_COLS) ||
    (action.action === "decrease" && action.cols === MIN_BLOCK_COLS)) {
    return {
      cols: action.cols,
      maxLength: action.maxLength
    }
  }
  if(action.action === "increase") {
    return {
      cols: action.cols + STEP_COUNT,
      maxLength: calcNewMaxLength(action.cols + STEP_COUNT, action.stringCount)
    }
  } else {   
    return {
      cols: action.cols - STEP_COUNT,
      maxLength: calcNewMaxLength(action.cols - STEP_COUNT, action.stringCount)
    }
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