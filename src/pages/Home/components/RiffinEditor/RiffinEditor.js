// Components / hooks
import { createContext, useReducer, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import AddNewBlockButton from "./components/AddNewBlockButton/AddNewBlockButton";
import LoadingPlaceholder from "containers/LoadingPlaceholder/LoadingPlaceholder";
import TitleInput from "./components/TitleInput/TitleInput";
import DeleteTabButton from "./components/DeleteTabButton/DeleteTabButton";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";
import { TagContext } from "containers/TagProvider/TagProvider";
// Utilties
import * as utils from "./Utilities";
// MUI
import { Box, Grid } from "@mui/material";


// * RiffinEditor relies on this dispatch context to update state values from child components.
// * Checkout React's documentation for more information:
// * https://reactjs.org/docs/hooks-reference.html#usereducer
// * https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down

const RiffinEditorDispatch = createContext(null);

// * Note that all of these handlers get called twice while in React.StrictMode. Most work fine, for example adding a character to a textarea position twice does not have any adverse effects. However some required workarounds such as deleteing to prevent multiple blocks from being deleted. Others have no workaround implemented.

// * React.StrictMode weirdness:
// * handleDuplicateBlock will duplicate the blocks twice.

/**
 * Updates the size of the block text areas. Dispatched from SizeSlider.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action.
 * @returns Updated state
 */
const handleBlockSizeChange = (state, action)=> {
  const newInputs = utils.generateNewTextareaValueAfterSizeChange(action.type, action.OGBlock.inputs, " ", action.stepCount);
  const newDashes = utils.generateNewTextareaValueAfterSizeChange(action.type, action.OGBlock.dashes, "-", action.stepCount);
  // updates block proeprties
  const newColumnCount = action.OGBlock.cols + action.stepCount;
  const newMaxLength = utils.calcTextareaMaxLength(newColumnCount, state.tablature.numberOfStrings)
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
    cols: newColumnCount,
    maxLength: newMaxLength,
  };
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  };
};

/**
 * Adds a character to the dispatching block's textareas at the position of the cursor. Note that adding a character means the " " in the input textarea is replaced with the character from the action. Dashes are replaced with a " ". Dispatched from InputTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleAddCharacter = (state, action) => {
  const blockToAddTo = state.tablature.blocks[state.selectedBlock.index];
  blockToAddTo.inputs = utils.replaceTextareaValue(blockToAddTo.inputs, action.character, action.selectionStart);
  blockToAddTo.dashes = utils.replaceTextareaValue(blockToAddTo.dashes, " ", action.selectionStart);
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart + 1)
  };
};

/**
 * Removes a character in the dispatching block's textareas at the position behind the cursor. Note that 'deleting' simply replaces the values of the textareas with the default values. For input textareas, values are replaced with" ". For dash textareas values are replaced with "-". Dispatched from InputTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleDeleteCharacter = (state, action) => {
  const blockToDeleteFrom = state.tablature.blocks[state.selectedBlock.index];
  blockToDeleteFrom.inputs = utils.replaceTextareaValue(blockToDeleteFrom.inputs, " ", action.selectionStart);
  blockToDeleteFrom.dashes = utils.replaceTextareaValue(blockToDeleteFrom.dashes, "-", action.selectionStart);
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart)
  };
};

/**
 * Duplicates the entire column directly behind the cursor. The duplicated column will be inserted according to the EditorConfig's DUPLICATION_COLUMN_GAP VALUE. Dispatched from InputTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleDuplicateColumn = (state, action) => {
  const duplicationBlock = state.tablature.blocks[state.selectedBlock.index];
  for(let value of action.duplicationValues) {
    duplicationBlock.inputs = utils.replaceTextareaValue(duplicationBlock.inputs, value.inputValue, value.targetPosition);
    duplicationBlock.dashes = utils.replaceTextareaValue(duplicationBlock.dashes, value.dashValue, value.targetPosition);
  }
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart + 1)
  };
};

/**
 * Updates the cursor position and currently selected block depending on which block the user clicked. Dispatched from InputTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleUpdateSelection = (state, action) => {
  return {
    tablature: state.tablature,
    selectedBlock: utils.generateSelectedBlockObject(action.blockIndex, action.blockRef),
    cursor: utils.generateCursorPositionObject(action.selectionStart)
  };
};

/**
 * Updates the cursor position. Dispatched from InputTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleUpdateCursorPosition = (state, action) => {
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart)
  };
};

/**
 * Replaces an entire column directly behind the cursor with default values. For input textareas, values are replaced with" ". For dash textareas values are replaced with "-". Dispatched from InputTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleDeleteColumn = (state, action) => {
  const deletionBlock = state.tablature.blocks[state.selectedBlock.index];
  for(let position of action.positionsToDelete) {
    deletionBlock.inputs = utils.replaceTextareaValue(deletionBlock.inputs, " ", position);
    deletionBlock.dashes = utils.replaceTextareaValue(deletionBlock.dashes, "-", position);
  }
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: utils.generateCursorPositionObject(action.selectionStart - 1)
  };
};

/**
 * Deletes a block from the tablature's blocks array. Dispatched from BlockOptionsMenu.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleDeleteBlock = (state, action) => {
  if(state.tablature.blocks.length === 1) {
    return {
      tablature: state.tablature,
      selectedBlock: state.selectedBlock,
      cursor: state.cursor
    };
  }
  state.tablature.blocks = state.tablature.blocks.filter((block) => {
    // A block with either have a tempKey or an _id, depending on if the tab has been saved to the backend. This also prevents double deleting when in React.StrictMode.
    if(action.block.tempKey && block.tempKey) {
      return (action.block.tempKey !== block.tempKey);
    } else {
      return (action.block._id !== block._id);
    }
  });
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  };
};

/**
 * Duplicates a block's values and pushes the copy to the tablature.blocks array. Dispatched from BlockOptionsMenu
 * * In React.StrictMode this causes 2 blocks to be pushed into the blocks array.
 * * A workaround similar to handelAddNewBlock could be implemented but would require more props.
 * @param {Object} state
 * @param {Object} action - an object specifying the action to perform and data relevant to the action.
 * @returns Updated state
 */
const handleDuplicateBlock = (state, action) => {
  const newBlock = { ...action.blockToDuplicate, tempKey: Date() + Math.random() };
  state.tablature.blocks.push(newBlock);
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  };
};

/**
 * Pushes an empty block to the tablature blocks array. Dispatched from AddNewBlock
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
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
  };
};

/**
 * Updates the tablature title. Dispatched from TitleInput.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleUpdateTablatureTitle = (state, action) => {
  state.tablature.name = action.name;
  return state;
};

/**
 * Updates the block label. Dispatched from NoteTextarea.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleUpdateBlockLabel = (state, action) => {
  state.tablature.blocks[action.index].label = action.value;
  return {
    tablature: state.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  };
};

/**
 * Sets the tablature object that the RiffinEditor derives all tablature data from. Dispatched from RiffinEditor when hitting a /edit/:tabId route.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. 
 * @returns Updated state
 */
const handleSetTablature = (state, action) => {
  return {
    tablature: action.tablature,
    selectedBlock: state.selectedBlock,
    cursor: state.cursor
  }
};

// TODO find a better way to access selected block rather than state.tablature.blocks[state.selectedBlock.index];

/**
 * Reducer that handles the state of the RiffinEditor.
 * @param {Object} state - the current state of editor
 * @param {Object} action - an object specifying the action to perform and data relevant to the action. All actions require at least a type property.
 * @returns Updated state
 */
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
    case 'setTablature':
      return handleSetTablature(state, action);
    default:
      return {
        tablature: state.tablature,
        selectedBlock: state.selectedBlock,
        cursor: state.cursor
      }
  }
}

const RiffinEditor = (props) => {
  const { tabId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [editor, dispatch] = useReducer(riffinReducer, {
    tablature: utils.getNewTablatureTemplateObject(props.numberOfStrings),
    selectedBlock: null,
    cursor: {position: null}
  });
  const { getTabFromUser } = useContext(TablatureContext);
  const { setTagsInSearchbar } = useContext(TagContext);

  /**
   * Prevents cursor from jumping to the end of the input textarea after a key is pressed.
   */
  useEffect(() => {
    if (editor.selectedBlock) {
      editor.selectedBlock.inputRef.current.selectionStart = editor.cursor.position;
      editor.selectedBlock.inputRef.current.selectionEnd = editor.cursor.position;
    }
  }, [editor.cursor, editor.selectedBlock]);

  /**
   * Gets the tablature to edit when RiffinEditor is mounted via a /edit/:tabId route.
   */
  useEffect(() => {
    if(tabId && getTabFromUser) {
      setIsLoading(true);
      const tablature = getTabFromUser(tabId);
      if(tablature) {
        const action = {
          tablature,
          type: 'setTablature'
        }
        setTagsInSearchbar(tablature.tags);
        setIsLoading(false)
        dispatch(action);
      }
    }
  }, [tabId, getTabFromUser, setTagsInSearchbar]);

  /**
   * Sets loading status when tablature is defined.
   */
  useEffect(() => {
    if(editor.tablature) {
      setIsLoading(false);
    }
  }, [editor.tablature]);

  return (
    <RiffinEditorDispatch.Provider value={dispatch}>
      <LoadingPlaceholder isLoading={isLoading}>
        <Grid container rowSpacing={2} columnSpacing={4} sx={{alignItems: "end"}}>
          <Grid item>
            <TitleInput name={editor.tablature.name}/>
          </Grid>
          <Grid item>
            <SaveTabButton 
              tablature={editor.tablature} 
              setIsLoading={setIsLoading} 
            />
          </Grid>
          <Grid item>
            <DeleteTabButton tablature={editor.tablature} />
          </Grid>
        </Grid>
        {editor.tablature.blocks.map((block, i) => (
        <Box sx={{my: 4}} key={i}>
          <TablatureBlock key={i} index={i} block={block} numberOfStrings={editor.tablature.numberOfStrings} />
        </Box>
        ))}
        <AddNewBlockButton numberOfBlocks={editor.tablature.blocks.length} />
      </LoadingPlaceholder>
    </RiffinEditorDispatch.Provider>
  );
}
 
export { RiffinEditor, RiffinEditorDispatch };