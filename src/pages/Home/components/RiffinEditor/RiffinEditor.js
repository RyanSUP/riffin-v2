import { createContext, useReducer, useEffect, useState } from "react";
import * as utils from "./Utilities";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";
import AddTablatureBlockButton from "./components/AddTablatureBlockButton/AddTablatureBlockButton";
import TitleInput from "./components/TitleInput/TitleInput";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";

const RiffinEditorDispatch = createContext(null);

const handleBlockSizeChange = (state, action)=> {
  const newInputs = utils.generateNewTextareaValueAfterSizeChange(action.type, action.OGBlock.inputs, " ", action.stepCount, action.OGBlock.cols);
  const newDashes = utils.generateNewTextareaValueAfterSizeChange(action.type, action.OGBlock.dashes, "-", action.stepCount, action.OGBlock.cols);
  // updates block proeprties
  const { cols, maxLength } = utils.generateNewSizePropertiesAfterSizeChange(action.type, action.OGBlock, action.stepCount);
  const indexOfBlockToUpdate = state.tablature.blocks.findIndex((block) => {
    if(action.OGBlock.tempKey && block.tempKey) {
      return (action.OGBlock.tempKey === block.tempKey);
    } else {
      return (action.OGBlock._id === block._id);
    }
  });
  state.tablature.blocks[indexOfBlockToUpdate] = {
    ...action.OGBlock,
    inputs: newInputs,
    dashes: newDashes,
    cols: cols,
    maxLength: maxLength,
  }
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

const handleAddCharacter = (state, action) => {
  const blockToAddTo = state.tablature.blocks[state.selectedBlock.index];
  blockToAddTo.inputs = utils.replaceTextareaValue(blockToAddTo.inputs, action.character, action.selectionStart)
  blockToAddTo.dashes = utils.replaceTextareaValue(blockToAddTo.dashes, " ", action.selectionStart)
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart + 1)
  }
};

const handleDeleteCharacter = (state, action) => {
  const blockToDeleteFrom = state.tablature.blocks[state.selectedBlock.index];
  blockToDeleteFrom.inputs = utils.replaceTextareaValue(blockToDeleteFrom.inputs, " ", action.selectionStart)
  blockToDeleteFrom.dashes = utils.replaceTextareaValue(blockToDeleteFrom.dashes, "-", action.selectionStart)
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart)
  }   
};

const handleDuplicateColumn = (state, action) => {
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
};

const handleUpdateSelection = (state, action) => {
  return {
    tablature: state.tablature,
    selectedBlock: utils.generateSelectedBlockObject(action.blockIndex, action.blockRef),
    cursor: utils.generateCursorPositionObject(action.selectionStart)
  };
};

const handleUpdateCursorPosition = (state, action) => {
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart)
  }
};

const handleDeleteColumn = (state, action) => {
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
};

const handleDeleteBlock = (state, action) => {
  state.tablature.blocks = state.tablature.blocks.filter((block) => {
    if(action.block.tempKey && block.tempKey) {
      return (action.block.tempKey !== block.tempKey) 
    } else {
      return (action.block._id !== block._id) 
    }
  });
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

const handleDuplicateBlock = (state, action) => {
  // * In React.StrictMode this causes 2 blocks to be pushed into the blocks array.
  const newBlock = { ...action.blockToDuplicate, tempKey: Date() + Math.random() };
  state.tablature.blocks.push(newBlock);
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

const handleAddNewBlock = (state, action) => {
  const newBlock = utils.getNewGuitarBlock(state.tablature.numberOfStrings)
  // * This check is a workaround to React.StrictMode's behavior of running reducers twice. Without this workaround, 2 blocks would be added.
  if(state.tablature.blocks.length < action.numberOfBlocksBeforeAdding + 1) {
    state.tablature.blocks.push(newBlock);
  }
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

const handleUpdateTablatureTitle = (state, action) => {
  state.tablature.name = action.name;
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

const handleUpdateBlockLabel = (state, action) => {
  state.tablature.blocks[action.index].label = action.value;
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

// TODO find a better way to access selected block rather than state.tablature.blocks[state.selectedBlock.index];
function riffinReducer(state, action) {
  switch (action.type) {
    case 'updateSelection':
      return handleUpdateSelection(state, action);
    case 'updateCursorPosition':
      return handleUpdateCursorPosition(state, action);
    case 'addCharacter':
      return handleAddCharacter(state, action);
    case 'deleteCharacter':
      return handleDeleteCharacter(state, action);
    case 'duplicateColumn':
      return handleDuplicateColumn(state, action);
    case 'deleteColumn':
      return handleDeleteColumn(state, action);
    case 'duplicateBlock':
      // * In React.StrictMode this causes 2 blocks to be pushed into the blocks array.
      return handleDuplicateBlock(state, action);
    case 'deleteBlock':
      return handleDeleteBlock(state, action);
    case 'increaseBlockSize':
      return handleBlockSizeChange(state, action)
    case 'decreaseBlockSize':
      return handleBlockSizeChange(state, action)
    case 'addNewBlock':
      return handleAddNewBlock(state, action);
    case 'updateTablatureTitle':
      return handleUpdateTablatureTitle(state, action);
    case 'updateBlockLabel':
      return handleUpdateBlockLabel(state, action);
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
  
  const [isLoading, setIsLoading] = useState(false);
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
      {!isLoading &&
      <>
        <TitleInput />
        <SaveTabButton tablature={editor.tablature} setIsLoading={setIsLoading} tags={props.tags}/>
        {editor.tablature.blocks.map((block, i) => (
          <TablatureBlock key={i} index={i} block={block} />)
        )}
        <AddTablatureBlockButton numberOfBlocks={editor.tablature.blocks.length} />
      </>
      }
    </RiffinEditorDispatch.Provider>
  );
}
 
export { RiffinEditor, RiffinEditorDispatch };