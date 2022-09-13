// Components / hooks
import { useState, useContext, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
// MUI
import Box from '@mui/material/Box';
import { CircularProgress, Paper } from "@mui/material";

// Services / utils
import * as tablatureServices from "services/tablatureServices";
import * as userUtils from "utils/userUtils";
import ExpandableBar from './components/ExpandableBar/ExpandableBar';
import Controls from './components/Controls/Controls'


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

  const deleteTablatureFromDatabase = () => {
    const idToken = userUtils.getIdTokenFromUser(user);
    tablatureServices.delete(tablature._id, idToken).then((res) => {
      console.log(res);
    });
    // TODO Navigate to trending
  };

  const saveTablatureToDatabase = () => {
    tablature.tags = props.tags
    const updateExistingTablature = (idToken) => {
      setIsLoading(true);
      tablatureServices.update(tablature, idToken).then((res) => {
        console.log(res);
        setIsLoading(false);
        setTablature({ ...tablature });
      });
    }
  
    const saveNewTablature = (idToken) => {
      setIsLoading(true);
      tablatureServices
        .create(tablature, idToken)
        .then((tablatureFromResponse) => {
          setIsLoading(false);
          navigate(`/edit/${tablatureFromResponse._id}`);
        });
    }

    const idToken = userUtils.getIdTokenFromUser(user);
    if (tablature._id) {
      updateExistingTablature(idToken);
    } else {
      saveNewTablature(idToken);
    }
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

  const addBarToTablature = useCallback(() => {
    const mapOfLastColumnIndexes = {
      40: true,
      81: true,
      122: true,
      163: true,
      204: true,
      245: true,
    };

    const initTextAreaWithValue = (character) => {
      let charactersInString = [];
      for (let i = 0; i < 245; i++) {
        if (i in mapOfLastColumnIndexes) {
          charactersInString.push("\n");
        } else {
          charactersInString.push(character);
        }
      }
      return charactersInString.join("");
    };

    const previousBars = [];
    tablature.bars.forEach((bar) => {
      previousBars.push({ ...bar });
    });

    const newBar = {
      label: `Bar ${tablature.bars.length + 1}`,
      tempKey: Date() + Math.random(),
      inputs: initTextAreaWithValue(" "),
      dashes: initTextAreaWithValue("-"),
      cols: 40,
      maxLength: 251
    };

    tablature.bars = [...previousBars, newBar];
    setTablature({ ...tablature });
  }, [tablature]);

  const setPublic = () => {
    const udpatedTablature = {
      ...tablature,
      isPublic: !tablature.isPublic,
    };
    setTablature(udpatedTablature);
  };

  const handleNameInput = (event) => {
    const udpatedTablature = {
      ...tablature,
      name: event.target.value,
    };
    setTablature(udpatedTablature);
  };

  const refreshTablatureObject = () => {
    setTablature({ ...tablature });
  }

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
      addBarToTablature()
    }
  }, [tablature, tabId, addBarToTablature])

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
            <Controls 
              deleteTablatureFromDatabase={deleteTablatureFromDatabase}
              allowDelete={showDeleteButton}
              setPublic={setPublic}
              isPublic={tablature.isPublic}
              saveTablatureToDatabase={saveTablatureToDatabase}
              addBarToTablature={addBarToTablature}    
            />
          </Box>
          {tablature.bars.map((bar, i) => (
            <ExpandableBar
              key={i}
              index={i}
              bar={bar}
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