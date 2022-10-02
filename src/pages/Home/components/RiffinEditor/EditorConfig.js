/**
 * How many columns are between steps in the SizeSlider.
 */
export const STEP_COUNT = 5;

/**
 * Rows of the textarea when editing a bass tab.
 */
export const BASS_STRING_COUNT = 4;

/**
 * Rows of the textarea when editing a guitar tab.
 */
export const GUITAR_STRING_COUNT = 6;

/**
 * Minimum allowable columns the textarea can be sized down to.
 */
export const MIN_BLOCK_COLS = 20;

/**
 * Maximum allowable columns the textarea can be sized
 */
export const MAX_BLOCK_COLS = 80;

/**
 * The default amount of columns that a block starts with.
 */
export const DEFAULT_BLOCK_COLS = 40;

/**
 * Controls how many columns to skip when duplicating a column. A target of 2 looks as follows:
 * [x][ ][ ] (duplicate) => [x][ ][x]
 */
export const DEFAULT_DUPLICATION_TARGET = 2;

/**
 * Map of allowable movement keys. The value is not used.
 */
export const MOVEMENT_KEYS = {
  ArrowDown: true,
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
};

/**
 * Key/Value pairs of allowable inputs. The "key" is the pressed keyboard key and the "value" is the dispatch action associated with the key.
 */
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
};

/**
 * Maximum characters in the note that sits above each TablatureBlock
 */
export const MAX_NOTE_CHARACTERS = 256;

/**
 * Maximum number of TablatureBlocks a user can have per document.
 */
export const MAX_BLOCKS = 12;