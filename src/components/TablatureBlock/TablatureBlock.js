// Components / hooks
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

import "./TablatureBlockStyle.css"

import { useTheme } from "@mui/material/styles";

const TablatureBlock = (props) => {
  const theme = useTheme(); // theme obtained with invoking this hook
  
  const inputsStyle = {
    background: "transparent",
    margin: 0,
    fontFamily: "Fira Code",
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.tabInput,
    fontSize: "1.2rem",
    padding: 0
  };
  
  const dashesStyle = {
    background: "transparent",
    margin: 0,
    position: "absolute",
    resize: "none",
    left: "0",
    translate: "0",
    zIndex: 1,
    outline: "none",
    border: "none",
    fontFamily: "Fira Code",
    color: theme.palette.primary.dashes,
    fontSize: "1.2rem",
    padding: 0,
  };

  return (
    <SimpleBar>
        <div style={{position: "relative", width: "fit-content"}}>
          <textarea
            readOnly={true}
            style={inputsStyle}
            value={props.blockData.inputs}
            cols={props.blockData.cols}
            rows={props.numberOfStrings}
            maxLength={props.blockData.maxLength}
            />
          <textarea
            readOnly={true}
            style={dashesStyle}
            value={props.blockData.dashes}
            cols={props.blockData.cols}
            rows={props.numberOfStrings}
            maxLength={props.blockData.maxLength}
          />
        </div>
    </SimpleBar>
  );
};

export default TablatureBlock;
