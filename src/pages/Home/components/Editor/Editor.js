// Components / hooks
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import ExpandableTablatureBlock from './components/ExpandableTablatureBlock/ExpandableTablatureBlock';
import AddNoteBlockButton from './components/AddNoteBlockButton/AddNoteBlockButton';
import DeleteTabButton from './components/DeleteTabButton/DeleteTabButton';
import SaveTabButton from './components/SaveTabButton/SaveTabButton';
import NoteBlock from './components/NoteBlock/NoteBlock';
import AddTablatureBlockButton from './components/AddTablatureBlockButton/AddTablatureBlockButton';

// Services / utils
import { getNewGuitarBlock } from "./utils/EditorUtils";

// MUI
import { CircularProgress, Paper } from "@mui/material";
import Box from '@mui/material/Box';

const Editor = (props) => {
  const [selectedTablatureBlock, setSelectedTablatureBlock] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ position: null }); // This can't be a number or it will cause 
  const [showDeleteButton, setShowDeleteButton] = useState(false); // Is the document already in the database?
  const [isLoading, setIsLoading] = useState(false); // is the document currently waiting for a response?
  const [tablature, setTablature] = useState({
    isPublic: false,
    name: "A tasty lick",
    blocks: [],
    tags: [],
    // numberOfStrings: 
  });

  const { user } = useContext(UserContext);
  const { tabId } = useParams();
  const { getTabFromUser } = useContext(TablatureContext)
  let navigate = useNavigate();

  const toggleLoading = (value) => setIsLoading(value);
  
  function handleAddCharacter(character, mapOfLastColumnIndexes) {
    if (cursorPosition.position in mapOfLastColumnIndexes) {
      setCursorPosition((prev) => {
        return { position: prev.position };
      });
    } else {
      const block = tablature.blocks[selectedTablatureBlock.index];
      const newBlock = { ...block };
      newBlock.inputs = getUpdatedTextAreaValues(
        "inputs",
        character,
        cursorPosition.position
      );
      newBlock.dashes = getUpdatedTextAreaValues(
        "dashes",
        " ",
        cursorPosition.position
      );
      tablature.blocks[selectedTablatureBlock.index] = newBlock;
      setTablature((prev) => { return {...prev}})
      setCursorPosition({ position: cursorPosition.position + 1 });
    }
  }

  function handleRemoveCharacter(mapOfFirstColumnIndexes) {
    if (cursorPosition.position in mapOfFirstColumnIndexes) {
      setCursorPosition((prev) => {
        return { position: prev.position };
      });
    } else {
      const block = tablature.blocks[selectedTablatureBlock.index];
      const newBlock = { ...block };
      let newCursorPosition = cursorPosition.position - 1;
      newBlock.inputs = getUpdatedTextAreaValues(
        "inputs",
        " ",
        newCursorPosition
      );
      newBlock.dashes = getUpdatedTextAreaValues(
        "dashes",
        "-",
        newCursorPosition
      );
      tablature.blocks[selectedTablatureBlock.index] = newBlock;
      setTablature((prev) => { return {...prev}})
      setCursorPosition({ position: newCursorPosition });
    }
  }

  const legalCharacters = {
    "~": handleAddCharacter, // vibrato
    "/": handleAddCharacter, // slide
    "^": handleAddCharacter, // bend
    "x": handleAddCharacter, // mute
    "p": handleAddCharacter, // pull off
    "h": handleAddCharacter, // hammer on
    0: handleAddCharacter,
    1: handleAddCharacter,
    2: handleAddCharacter,
    3: handleAddCharacter,
    4: handleAddCharacter,
    5: handleAddCharacter,
    6: handleAddCharacter,
    7: handleAddCharacter,
    8: handleAddCharacter,
    9: handleAddCharacter,
    "d": handleAddCharacter, // duplicate
    "Backspace": handleRemoveCharacter,
  //   insertLineBreak: handlePressingEnter, // Move cursor to the next line (string)
  };

  function getUpdatedTextAreaValues(area, character, insertionIndex) {
    const block = tablature.blocks[selectedTablatureBlock.index];
    let currentValueAsArray = [...block[area]];
    currentValueAsArray[insertionIndex] = character;
    const updatedValue = currentValueAsArray.join("");
    return updatedValue;
  }

  const arrows = {
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true,
    ArrowUp: true,
  };

  const deleteBlock = (blockIndex) => {
    const newBlocks = [];
    tablature.blocks.forEach((block, i) => {
      if (blockIndex !== i) {
        newBlocks.push({ ...block });
      }
    });

    tablature.blocks = newBlocks;
    setTablature({ ...tablature });
  };

  const duplicateBlock = (blockIndex) => {
    const newBlock = {
      tempKey: Date() + Math.random(),
      label: tablature.blocks[blockIndex].label,
      inputs: tablature.blocks[blockIndex].inputs,
      dashes: tablature.blocks[blockIndex].dashes,
      cols: tablature.blocks[blockIndex].cols,
      maxLength: tablature.blocks[blockIndex].maxLength
    }
    tablature.blocks.push(newBlock)
    refreshTablatureObject()
  }

  const handleNameInput = (event) => {
    const udpatedTablature = {
      ...tablature,
      name: event.target.value,
    };
    setTablature(udpatedTablature);
  };

  const refreshTablatureObject = () => setTablature({ ...tablature });

  const handleClickedBlock = (event, barIndex, barRef) => {
    setSelectedTablatureBlock({ inputRef: barRef, index: barIndex });
    setCursorPosition({ position: event.target.selectionStart });
  };

  const handleKeyUpInBlock = (event) => {
    if (event.key in arrows) {
      setCursorPosition({ position: event.target.selectionStart });
    }
  };

  const handleBlockChange = (event, mapOfLastColumnIndexes, mapOfFirstColumnIndexes) => {
    const key = event.nativeEvent.data;
    console.log(event.nativeEvent.inputType);
    event.preventDefault();
    if (key in legalCharacters) {
      console.log(key);
      legalCharacters[key](key, mapOfLastColumnIndexes);
    } else if (key === null) {
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        legalCharacters["Backspace"](mapOfFirstColumnIndexes);
      } else if (event.nativeEvent.inputType === "insertLineBreak") {
        legalCharacters["insertLineBreak"]();
      }
    } else {
      setCursorPosition((prev) => {
        return { position: prev.position };
      });
    }
  };

  // Prevent crusor from jumping to end of input.
  useEffect(() => {
    if (selectedTablatureBlock) {
      selectedTablatureBlock.inputRef.current.selectionStart = cursorPosition.position;
      selectedTablatureBlock.inputRef.current.selectionEnd = cursorPosition.position;
      console.log("New cursorPosition: ", cursorPosition.position);
    }
  }, [cursorPosition, selectedTablatureBlock]);

  // Check if the document is new
  useEffect(() => {
    tablature["_id"] ? setShowDeleteButton(true) : setShowDeleteButton(false);
  }, [tablature]);

  useEffect(() => {
    if (tabId) {
      const tab = getTabFromUser(tabId)
      if(tab) {
        setTablature(getTabFromUser(tabId));
      } else {
        navigate('/login')
      }
    }
  }, [tabId, getTabFromUser, navigate]);
  
  useEffect(() => {
    if (user) {
      let username = user.username;
      setTablature((prev) => {
        return { ...prev, owner: username };
      });
    }
  }, [user]);

  useEffect(() => {
    if(!tabId && tablature.blocks.length === 0) {
      const newBlock = getNewGuitarBlock()
      setTablature((prev) => {
        prev.blocks = [newBlock]
        return {...prev}
      })
    }
  }, [tabId, tablature.blocks.length])

  return (
    <div data-testid="Editor">
      {isLoading ? ( <CircularProgress /> ) : (
        <Paper>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <input
              type="text"
              name="name"
              value={tablature.name}
              onChange={handleNameInput}
              placeholder="A tasty lick"
            />
            <AddTablatureBlockButton 
              tablature={tablature}
              refreshTablatureObject={refreshTablatureObject}
            />
            <AddNoteBlockButton 
              tablature={tablature}
              refreshTablatureObject={refreshTablatureObject}
            />
            <SaveTabButton 
              tablature={tablature}
              toggleLoading={toggleLoading}
              tags={props.tags}
              refreshTablatureObject={refreshTablatureObject}
            />
            {showDeleteButton &&
              <DeleteTabButton 
                tablature_id={tablature._id}
              />
            }
          </Box>
          {tablature.blocks.map((block, i) => {
            if(block.blockType === "tablature") {
              return (
                <ExpandableTablatureBlock
                  key={i}
                  index={i}
                  block={block}
                  duplicateBlock={duplicateBlock}
                  deleteBlock={deleteBlock}
                  handleBlockChange={handleBlockChange}
                  handleKeyUpInBlock={handleKeyUpInBlock} 
                  handleClickedBlock={handleClickedBlock}
                  refreshTablatureObject={refreshTablatureObject}
                />
              )
            } else {
              return (
                <NoteBlock
                  key={i}
                  index={i}
                  block={block}
                  deleteBlock={deleteBlock}
                  refreshTablatureObject={refreshTablatureObject}
                />
              )
            }
          })}
        </Paper>
      )}
    </div>
  );
}
 
export default Editor;