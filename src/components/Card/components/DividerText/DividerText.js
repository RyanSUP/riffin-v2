import { Typography } from "@mui/material";

const textStyle ={
  whiteSpace: "nowrap",
  alignSelf: "center",
};

/**
 * * Centers text that is used with the DividerWrapper component.
 * @param {Object} props - the text to display
 * @returns the text styled to center align in a DividerWrapper.
 */

const DividerText = (props) => {
  return (
    <Typography sx={textStyle}>{props.children}</Typography>
  );
}
 
export default DividerText;