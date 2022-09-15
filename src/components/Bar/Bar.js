// MUI hook that gives components access to theme stored in ThemeProvider
import { useTheme } from "@mui/material/styles";

const Bar = (props) => {
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
    color: theme.palette.primary.main,
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
    color: theme.palette.background.default,
  };

  return (
    <div style={{ position: "relative"}}>
      <textarea
        readOnly={true}
        style={inputsStyle}
        value={props.barData.inputs}
        cols={props.barData.cols}
        rows="6"
        maxLength={props.barData.maxLength}
      />
      <textarea
        readOnly={true}
        style={dashesStyle}
        value={props.barData.dashes}
        cols={props.barData.cols}
        rows="6"
        maxLength={props.barData.maxLength}
      />
    </div>
  );
};

export default Bar;
