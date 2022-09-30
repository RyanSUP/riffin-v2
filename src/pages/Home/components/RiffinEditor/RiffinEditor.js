import { createContext, useReducer, useEffect } from "react";
import * as utils from "./Utilities";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";

const RiffinEditorDispatch = createContext(null);

// TODO find a better way to access selected block rather than state.tablature.blocks[state.selectedBlock.index];
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
      const blockToAddTo = state.tablature.blocks[state.selectedBlock.index];
      blockToAddTo.inputs = utils.replaceTextareaValue(blockToAddTo.inputs, action.character, action.selectionStart)
      blockToAddTo.dashes = utils.replaceTextareaValue(blockToAddTo.dashes, " ", action.selectionStart)
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: utils.generateCursorPositionObject(action.selectionStart + 1)
      }
    case 'deleteCharacter':
      const blockToDeleteFrom = state.tablature.blocks[state.selectedBlock.index];
      blockToDeleteFrom.inputs = utils.replaceTextareaValue(blockToDeleteFrom.inputs, " ", action.selectionStart)
      blockToDeleteFrom.dashes = utils.replaceTextareaValue(blockToDeleteFrom.dashes, "-", action.selectionStart)
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: utils.generateCursorPositionObject(action.selectionStart)
      }   
    case 'duplicateColumn':
      const duplicationBlock = state.tablature.blocks[state.selectedBlock.index];
      for(let value of action.duplicationValues) {
        duplicationBlock.inputs = utils.replaceTextareaValue(duplicationBlock.inputs, value.inputValue, value.targetPosition)
        duplicationBlock.dashes = utils.replaceTextareaValue(duplicationBlock.dashes, value.dashValue, value.targetPosition)
      }
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: utils.generateCursorPositionObject(action.selectionStart + 1)
      }
    case 'deleteColumn':
      console.log('action recieved', action)

      const deletionBlock = state.tablature.blocks[state.selectedBlock.index];
      for(let position of action.positionsToDelete) {
        deletionBlock.inputs = utils.replaceTextareaValue(deletionBlock.inputs, " ", position)
        deletionBlock.dashes = utils.replaceTextareaValue(deletionBlock.dashes, "-", position)
      }
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: utils.generateCursorPositionObject(action.selectionStart - 1)
      }
    case 'duplicateBlock':
      const newBlock = { ...action.blockToDuplicate, tempKey: Date() + Math.random() };
      state.tablature.blocks.push(newBlock);
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: state.cursor
      }
    case 'deleteBlock':
      const updatedBlocks = state.tablature.blocks.filter((block) => {
        if(action.block.tempKey && block.tempKey) {
          return (action.block.tempKey !== block.tempKey) 
        } else {
          return (action.block._id !== block._id) 
        }
      });
      state.tablature.blocks = updatedBlocks;
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: state.cursor
      }
    default:
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: state.cursor
      }
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