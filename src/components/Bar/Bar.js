// Services
import { useRef } from "react";
// MUI hook that gives components access to theme stored in ThemeProvider
import { useTheme } from "@mui/material/styles";

const Bar = (props) => {
  const inputRef = useRef(); // This is used to know which bar the user has selected.
  const theme = useTheme(); // theme obtained with invoking this hook
  
  const inputsStyle = {
    background: "transparent",
    margin: 0,
    position: "relative",
    resize: "none",
    textAlign: "center",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.main
  };
  
  const dashesStyle = {
    background: "transparent",
    margin: 0,
    position: "absolute",
    resize: "none",
    textAlign: "center",
    left: (props.readOnly) ? "50%" : "0",
    translate: (props.readOnly) ? "-50%" : "0",
    zIndex: 1,
    outline: "none",
    border: "none",
    color: theme.palette.background.default
  };

  return (
    <div style={{ position: "relative" }}>
      <textarea
        readOnly={props.readOnly}
        style={inputsStyle}
        value={props.barData.inputs}
        onChange={(event) => props.handleBarChange(event)}
        onKeyUp={(event) => props.handleKeyUpInBar(event)}
        onPaste={(event) => event.preventDefault()}
        onClick={(event) => props.handleClickedBar(event, props.index, inputRef)}
        cols="40"
        rows="6"
        maxLength="251"
        id="riffin-editor-inputGrid"
        ref={inputRef}
      />
      <textarea
        readOnly={true}
        style={dashesStyle}
        value={props.barData.dashes}
        cols="40"
        rows="6"
        maxLength="251"
        id="riffin-editor-dashGrid"
      />
    </div>
  );
};

export default Bar;
