// MUI
import { useTheme } from "@mui/material/styles";

const TablatureGrill = () => {
  const theme = useTheme(); // theme obtained with invoking this hook

  const breakupStyle = {
    background: "transparent",
    margin: 0,
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    padding: 0,
    textAlign: "right"
  };

  return (
    <textarea
    readOnly={true}
    style={breakupStyle}
    value={`|\n|\n|\n|\n|\n|`}
    cols={1}
    rows="6"
  />
  );
}
 
export default TablatureGrill;