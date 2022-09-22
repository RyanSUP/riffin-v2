// Components / hooks
import { useState } from "react";
// MUI
import { useTheme } from "@mui/material/styles";

const TablatureGrill = (props) => {
  const guitarGrillValue = `|\n|\n|\n|\n|\n|`;
  const bassGrillValue = `|\n|\n|\n|`;
  const [value] = useState(
    props.numberOfStrings === 6 ? guitarGrillValue : bassGrillValue
  );
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
    textAlign: "right",
  };

  return (
    <textarea
      readOnly={true}
      style={breakupStyle}
      value={value}
      cols={1}
      rows={props.numberOfStrings}
    />
  );
};

export default TablatureGrill;
