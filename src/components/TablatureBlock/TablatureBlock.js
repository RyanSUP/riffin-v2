// Components / hooks
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import "./TablatureBlockStyle.css";

// MUI hook that gives components access to theme stored in ThemeProvider
import { useTheme } from "@mui/material/styles";

const TablatureBlock = (props) => {
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
      <div
        style={{ position: "relative", width: "fit-content", margin: "0 auto" }}
      >
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
