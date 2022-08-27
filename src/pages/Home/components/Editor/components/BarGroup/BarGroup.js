// Componeonts / hooks
import { useState, useEffect } from "react";
import Bar from "components/Bar/Bar";

// MUI
import { Grid, Tooltip, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const BarGroup = (props) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ position: null }); // This can't be a number or it will cause referenceing errors.
  const mapOfFirstColumnIndexes = {
    0: true,
    41: true,
    82: true,
    123: true,
    164: true,
    205: true,
  };

  const mapOfLastColumnIndexes = {
    40: true,
    81: true,
    122: true,
    163: true,
    204: true,
    245: true,
  };

  const legalCharacters = {
    "~": handleAddCharacter, // vibrato
    "/": handleAddCharacter, // slide
    "^": handleAddCharacter, // bend
    x: handleAddCharacter, // mute
    p: handleAddCharacter, // pull off
    h: handleAddCharacter, // hammer on
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
    d: handleAddCharacter, // duplicate
    Backspace: handleRemoveCharacter,
    insertLineBreak: handlePressingEnter, // Move cursor to the next line (string)
  };

  const arrows = {
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true,
    ArrowUp: true,
  };

  function handlePressingEnter() {
    console.log("pressingEnter");
    setCursorPosition((prev) => {
      let pos;
      if (prev.position >= 205) {
        pos = prev.position - 41 * 5 + 1;
      } else {
        pos = prev.position + 41;
      }
      const newPosition = {
        position: pos,
      };
      return newPosition;
    });
  }

  function getUpdatedTextAreaValues(area, character, insertionIndex) {
    const bar = props.bars[selectedBar.index];
    let currentValueAsArray = [...bar[area]];
    currentValueAsArray[insertionIndex] = character;
    const updatedValue = currentValueAsArray.join("");
    return updatedValue;
  }

  function handleAddCharacter(character) {
    if (cursorPosition.position in mapOfLastColumnIndexes) {
      setCursorPosition((prev) => {
        return { position: prev.position };
      });
    } else {
      const bar = props.bars[selectedBar.index];
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
      props.bars[selectedBar.index] = newBar;
      props.refreshTablatureObject()
      setCursorPosition({ position: cursorPosition.position + 1 });
    }
  }

  function handleRemoveCharacter() {
    if (cursorPosition.position in mapOfFirstColumnIndexes) {
      setCursorPosition((prev) => {
        return { position: prev.position };
      });
    } else {
      const bar = props.bars[selectedBar.index];
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
      props.bars[selectedBar.index] = newBar;
      props.refreshTablatureObject()
      setCursorPosition({ position: newCursorPosition });
    }
  }

  const handleKeyUpInBar = (event) => {
    if (event.key in arrows) {
      setCursorPosition({ position: event.target.selectionStart });
    }
  };

  const handleClickedBar = (event, barIndex, barRef) => {
    setSelectedBar({ inputRef: barRef, index: barIndex });
    setCursorPosition({ position: event.target.selectionStart });
  };

  // Prevent crusor from jumping to end of input.
  useEffect(() => {
    if (selectedBar) {
      selectedBar.inputRef.current.selectionStart = cursorPosition.position;
      selectedBar.inputRef.current.selectionEnd = cursorPosition.position;
      console.log("New cursorPosition: ", cursorPosition.position);
    }
  }, [cursorPosition, selectedBar]);
  
  const handleBarChange = (event) => {
    const key = event.nativeEvent.data;
    console.log(event.nativeEvent.inputType);
    event.preventDefault();
    if (key in legalCharacters) {
      console.log(key);
      legalCharacters[key](key);
    } else if (key === null) {
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        legalCharacters["Backspace"]();
      } else if (event.nativeEvent.inputType === "insertLineBreak") {
        legalCharacters["insertLineBreak"]();
      }
    } else {
      setCursorPosition((prev) => {
        return { position: prev.position };
      });
    }
  };

  const handleLabelInput = (event, barIndex) => {
    event.preventDefault()
    const updatedBar = {
      ...props.bars[barIndex],
      label: event.target.value,
    };
    props.bars[barIndex] = updatedBar
    props.refreshTablatureObject()
  }

  return (
    <Grid container>
    {props.bars.map((bar, i) => 
      (
        <Grid item key={(bar._id) ? bar._id : bar.tempKey}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <input 
              style={{"marginLeft": "10px"}}
              type="text"
              name="name"
              value={bar.label}
              onChange={(event) => handleLabelInput(event, i)}
              placeholder="a new bar"
            />
            {props.bars.length > 1 &&
              <Tooltip title="Delete bar" size="small">
                <IconButton onClick={()=> props.deleteBarFromTablature(i)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
          </Box>
          <Bar
            index={i}
            barData={bar}
            handleBarChange={handleBarChange}
            handleClickedBar={handleClickedBar}
            handleKeyUpInBar={handleKeyUpInBar}
            readOnly={false}
          />
        </Grid>
      ))}
    </Grid>
  );
}
 
export default BarGroup;