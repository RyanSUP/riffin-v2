// Components / hooks
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import ExpandableBar from './components/ExpandableBar/ExpandableBar';
import AddBlockButton from './components/AddBlockButton/AddBlockButton';
import DeleteTabButton from './components/DeleteTabButton/DeleteTabButton';
import SaveTabButton from './components/SaveTabButton/SaveTabButton';

// Services / utils
import { getNewGuitarBlock } from "./utils/EditorUtils";

// MUI
import { CircularProgress, Paper } from "@mui/material";
import Box from '@mui/material/Box';

const Editor = (props) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ position: null }); // This can't be a number or it will cause 
  const [showDeleteButton, setShowDeleteButton] = useState(false); // Is the document already in the database?
  const [isLoading, setIsLoading] = useState(false); // is the document currently waiting for a response?
  const [tablature, setTablature] = useState({
    isPublic: false,
    name: "A tasty lick",
    bars: [],
    tags: [],
    isBassTab: false,
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
      const bar = tablature.bars[selectedBar.index];
      const newBar = { ...bar };
      newBar.inputs = getUpdatedTextAreaValues(
        "inputs",
        character,
        cursorPosition.position
      );
      newBar.dashes = getUpdatedTextAreaValues(
        "dashes",
        " ",
        cursorPosition.position
      );
      tablature.bars[selectedBar.index] = newBar;
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
      const bar = tablature.bars[selectedBar.index];
      const newBar = { ...bar };
      let newCursorPosition = cursorPosition.position - 1;
      newBar.inputs = getUpdatedTextAreaValues(
        "inputs",
        " ",
        newCursorPosition
      );
      newBar.dashes = getUpdatedTextAreaValues(
        "dashes",
        "-",
        newCursorPosition
      );
      tablature.bars[selectedBar.index] = newBar;
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
    const bar = tablature.bars[selectedBar.index];
    let currentValueAsArray = [...bar[area]];
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

  const deleteBarFromTablature = (barIndex) => {
    const newBars = [];
    tablature.bars.forEach((bar, i) => {
      if (barIndex !== i) {
        newBars.push({ ...bar });
      }
    });

    tablature.bars = newBars;
    setTablature({ ...tablature });
  };

  const duplicateBlock = (blockIndex) => {
    const newBlock = {
      tempKey: Date() + Math.random(),
      label: tablature.bars[blockIndex].label,
      inputs: tablature.bars[blockIndex].inputs,
      dashes: tablature.bars[blockIndex].dashes,
      cols: tablature.bars[blockIndex].cols,
      maxLength: tablature.bars[blockIndex].maxLength
    }
    tablature.bars.push(newBlock)
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

  const handleClickedBar = (event, barIndex, barRef) => {
    setSelectedBar({ inputRef: barRef, index: barIndex });
    setCursorPosition({ position: event.target.selectionStart });
  };

  const handleKeyUpInBar = (event) => {
    if (event.key in arrows) {
      setCursorPosition({ position: event.target.selectionStart });
    }
  };

  const handleBarChange = (event, mapOfLastColumnIndexes, mapOfFirstColumnIndexes) => {
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
    if (selectedBar) {
      selectedBar.inputRef.current.selectionStart = cursorPosition.position;
      selectedBar.inputRef.current.selectionEnd = cursorPosition.position;
      console.log("New cursorPosition: ", cursorPosition.position);
    }
  }, [cursorPosition, selectedBar]);

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
        navigate('/trending')
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
    if(!tabId && tablature.bars.length === 0) {
      const newBlock = getNewGuitarBlock()
      setTablature((prev) => {
        prev.bars = [newBlock]
        return {...prev}
      })
    }
  }, [tabId, tablature.bars.length])

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
            <AddBlockButton 
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
          {tablature.bars.map((bar, i) => (
            <ExpandableBar
              key={i}
              index={i}
              bar={bar}
              duplicateBlock={duplicateBlock}
              deleteBarFromTablature={deleteBarFromTablature}
              handleBarChange={handleBarChange}
              handleKeyUpInBar={handleKeyUpInBar} 
              handleClickedBar={handleClickedBar}
              refreshTablatureObject={refreshTablatureObject}
            />
          ))}
        </Paper>
      )}
    </div>
  );
}
 
export default Editor;