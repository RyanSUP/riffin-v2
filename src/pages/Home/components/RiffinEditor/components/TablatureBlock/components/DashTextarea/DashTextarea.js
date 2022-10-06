// Components / hooks
import { useTheme } from "@mui/material/styles";

/**
 * * DashTextarea is readonly and displays the dashes behind the input textarea. It is absolutely positioned and uses a z-index to ensure the user can't interact with the textarea (the textarea is readonly for an additional safeguard). The values are derived from the user actions in the InputTextarea.
 */

const DashTextarea = (props) => {
  const theme = useTheme();
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
    color: theme.palette.dashes.main,
    fontSize: "inherit",
    padding: 0,
  };

  return (
    <textarea
      readOnly={true}
      style={dashesStyle}
      value={props.block.dashes}
      cols={props.block.cols}
      rows={props.numberOfStrings}
      maxLength={props.block.maxLength}
    />
  );
};
 
export default DashTextarea;