// Components / hooks
import { useTheme } from "@mui/material/styles";

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
    color: theme.palette.primary.dashes,
    fontSize: "1.2rem",
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