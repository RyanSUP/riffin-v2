import { createContext, useReducer } from "react";
import * as utils from "./Utilities";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";

const RiffinEditorDispatch = createContext(null);

function riffinReducer(state, action) {
  switch (action.type) {
    case 'updateSelection':
      return {
        tablature: state.tablature,
        selectedBlock: utils.updateSelectedBlock(action.blockIndex, action.blockRef),
        cursorPosition: utils.updateCursorPosition(action.selectionStart)
      };
    case 'updateCursorPosition':
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursorPosition: utils.updateCursorPosition(action.selectionStart)
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
    tablature: utils.createTablatureTemplateObject(props.numberOfStrings),
    selectedBlock: null,
    cursorPosition: {position: null}
  });

  return (
    <RiffinEditorDispatch.Provider value={dispatch}>
      {editor.tablature.blocks.map((block, i) => (
        <TablatureBlock key={i} index={i} block={block} />)
      )}
    </RiffinEditorDispatch.Provider>
  );
}
 
export { RiffinEditor, RiffinEditorDispatch };