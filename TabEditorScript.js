/* ----------- CONSTANTS ------------ */

const inputGrid = document.querySelector('#riffin-editor-inputGrid')
const dashGrid = document.querySelector('#riffin-editor-dashGrid')

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

/* ----------- UTILITY FUNCTIONS ------------ */

const fillTextArea = (textArea, c) => {
  for(let i = 0; i < 240; i++) {
    if(i%40 === 0 && i !== 0) textArea.value += '\n'
    textArea.value += c
  }
}

const updateCursorPosition = (newPosition) => {
  inputGrid.selectionStart = newPosition
  inputGrid.selectionEnd = newPosition
}

const getNewValues = (currentValue, cursorPosition, character) => {
  let currentValueAsArray =  [...currentValue]
  currentValueAsArray[cursorPosition] = character
  return currentValueAsArray.join('')
}

const updateGridValues = (cursorPosition, inputGridValue, dashGridValue) => {
  inputGrid.value = getNewValues(inputGrid.value, cursorPosition, inputGridValue)
  dashGrid.value = getNewValues(dashGrid.value, cursorPosition, dashGridValue)
}


const getPositionsAboveCursor = (cursorPosition) => {
  let arrayOfPositions = []
  for(let position = cursorPosition - 41; position >= 0; position -= 41) {
    arrayOfPositions.push(position - 1)
  }
  return arrayOfPositions
}

const getPositionsBelowCursor = (cursorPosition) => {
  let arrayOfPositions = []
  for(let position = cursorPosition + 41; position <= 241; position += 41) {
    arrayOfPositions.push(position - 1)
  }
  return arrayOfPositions
}

const getPositionsToDuplicate = (cursorPosition) => {
  let aboveCursor = getPositionsAboveCursor(cursorPosition)
  let belowCursor = getPositionsBelowCursor(cursorPosition)
  let positions = [cursorPosition - 1, ...aboveCursor, ...belowCursor]
  let gridValuesArray = [...inputGrid.value]
  positions = positions.filter(position => gridValuesArray[position] !== ' ')
  return positions
}
/* ----------- FUNCTIONS ------------ */

const init = () => {
  fillTextArea(inputGrid, ' ')
  fillTextArea(dashGrid, '-')
}

/* ----------- EVENT HANDLERS ------------ */

function handleAddCharacter(character) {
  let cursorPosition = inputGrid.selectionStart
  if(cursorPosition === LAST_INPUT_POSITION) return
  if(lastColumnIndexes.includes(cursorPosition)) return
  updateGridValues(cursorPosition, character, " ")
  updateCursorPosition(cursorPosition + 1)
}

function handleRemoveCharacter() {
  let cursorPosition = inputGrid.selectionStart - 1
  if(firstColumnIndexes.includes(cursorPosition)) return
  updateGridValues(cursorPosition, " ", "-")
  updateCursorPosition(cursorPosition)
}

function handleDuplicate() {
  let cursorPosition = inputGrid.selectionStart
  // Can't duplicate from these columns
  if(firstColumnIndexes.includes(cursorPosition)) return
  if(lastColumnIndexes.includes(cursorPosition)) return 
  if(secondToLastCol.includes(cursorPosition)) return 

  let positionsToDuplicate = getPositionsToDuplicate(cursorPosition)
  if(positionsToDuplicate.length === 0) return

  let gridValuesArray = [...inputGrid.value]
  positionsToDuplicate.forEach(pos => {
    updateGridValues(pos + 2, gridValuesArray[pos], " ")
  })

  updateCursorPosition(cursorPosition + 2)
}

/* ----------- LISTENERS ------------ */

inputGrid.addEventListener('keydown', e => {
  if(arrows[e.key]) return // Arrows can perform default action
  e.preventDefault()
  if(e.key in legalCharacters) {
    legalCharacters[e.key](e.key)
  }
})

inputGrid.addEventListener('paste', e => e.preventDefault())

/* ----------- MAIN ------------ */

init()