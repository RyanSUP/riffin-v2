import { createContext, useReducer, useEffect } from "react";
import * as utils from "./Utilities";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";

const RiffinEditorDispatch = createContext(null);

function riffinReducer(state, action) {
  switch (action.type) {
    case 'updateSelection':
      return {
        tablature: state.tablature,
        selectedBlock: utils.generateSelectedBlockObject(action.blockIndex, action.blockRef),
        cursor: utils.generateCursorPositionObject(action.selectionStart)
      };
    case 'updateCursorPosition':
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: utils.generateCursorPositionObject(action.selectionStart)
      }
    case 'addCharacter':
      const selectedBlock = state.tablature.blocks[state.selectedBlock.index];
      selectedBlock.inputs = utils.replaceTextareaValue(selectedBlock.inputs, action.character, action.selectionStart)
      selectedBlock.dashes = utils.replaceTextareaValue(selectedBlock.dashes, " ", action.selectionStart)
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: utils.generateCursorPositionObject(action.selectionStart + 1)
      }
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const RiffinEditor = (props) => {
  // Note: `dispatch` won't change between re-renders
  const [editor, dispatch] = useReducer(riffinReducer, {
    tablature: utils.getNewTablatureTemplateObject(props.numberOfStrings),
    selectedBlock: null,
    cursor: {position: null}
  });
  
  // Prevent crusor from jumping to end of input.
  useEffect(() => {
    if (editor.selectedBlock) {
      editor.selectedBlock.inputRef.current.selectionStart = editor.cursor.position;
      editor.selectedBlock.inputRef.current.selectionEnd = editor.cursor.position;
      console.log("New editor.cursor: ", editor.cursor.position);
    }
  }, [editor.cursor, editor.selectedBlock]);

  return (
    <RiffinEditorDispatch.Provider value={dispatch}>
      {editor.tablature.blocks.map((block, i) => (
        <TablatureBlock key={i} index={i} block={block} />)
      )}
    </RiffinEditorDispatch.Provider>
  );
}
 
export { RiffinEditor, RiffinEditorDispatch };