// Components / hooks
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

import "./Bar.css"

// MUI hook that gives components access to theme stored in ThemeProvider
import { useTheme } from "@mui/material/styles";

const Bar = (props) => {
  const theme = useTheme(); // theme obtained with invoking this hook
  
  const inputsStyle = {
    background: "transparent",
    margin: 0,
    padding: 0,
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.main,
  };
  
  const dashesStyle = {
    background: "transparent",
    margin: 0,
    padding: 0,
    position: "absolute",
    resize: "none",
    left: "50%",
    translate: "-50%",
    zIndex: 1,
    outline: "none",
    border: "none",
    color: theme.palette.background.default,
  };

  return (
    <SimpleBar>
      <div style={{ position: "relative", width: "fit-content", margin: "0 auto"}}>
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
    </SimpleBar>
  );
};

export default Bar;
