export const STEP_COUNT = 5
export const BASS_STRING_COUNT = 4
export const GUITAR_STRING_COUNT = 6
export const MIN_BLOCK_COLS = 20
export const DEFAULT_BLOCK_COLS = 40
export const MAX_BLOCK_COLS = 80
export const DUPLICATION_COLUMN_GAP = 2
export const MOVEMENT_KEYS = {
  ArrowDown: true,
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
};
export const LEGAL_INPUTS = {
  "~": "addCharacter", // vibrato
  "/": "addCharacter", // slide
  "^": "addCharacter", // bend
  "x": "addCharacter", // mute
  "p": "addCharacter", // pull off
  "h": "addCharacter", // hammer on
  0: "addCharacter",
  1: "addCharacter",
  2: "addCharacter",
  3: "addCharacter",
  4: "addCharacter",
  5: "addCharacter",
  6: "addCharacter",
  7: "addCharacter",
  8: "addCharacter",
  9: "addCharacter",
  "]": "duplicateColumn", // duplicate chord
  "[": "deleteColumn", // deleteChord
  "Backspace": "deleteCharacter",
}