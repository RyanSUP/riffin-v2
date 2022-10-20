// MUI
import { Box } from "@mui/material";

const childWrapperStyle = {
  display: 'flex', 
  flexDirection: 'column',
};

const GutterBox = (props) => {
  
  const gutterStyle = {
    display: 'flex', 
    justifyContent: props.justifyContent,
    mx: 4
  };

  return (
    <Box fixed sx={gutterStyle}>
      <Box sx={childWrapperStyle}>
        {props.children}
      </Box>
    </Box>
  );
}
 
export default GutterBox;