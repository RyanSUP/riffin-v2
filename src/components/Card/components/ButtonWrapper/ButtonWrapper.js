import { Button, Box } from "@mui/material";

const buttonStyle = {
  width: '100%', 
  py: 2
};

const boxStyle = {
  width: '100%',
};

/**
 * Wraps a button around all children.
 * @param {Object} props onClick, disabled
 * @returns children wrapped in a button
 */
const ButtonWrapper = (props) => {
  return (
    <Button sx={buttonStyle} onClick={props.onClick} disabled={props.disabled}>
      <Box sx={boxStyle}>
        {props.children}
      </Box>
    </Button>
  );
}
 
export default ButtonWrapper;