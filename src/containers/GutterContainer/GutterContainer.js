// MUI
import { Box, Container } from "@mui/material";

const childWrapperStyle = {
  maxWidth: '175px', 
  display: 'flex', 
  flexDirection: 'column',
};

const GutterContainer = (props) => {
  
  const gutterStyle = {
    display: 'flex', 
    justifyContent: props.justifyContent,
  };

  return (
    <Container sx={gutterStyle}>
      <Box sx={childWrapperStyle}>
        {props.children}
      </Box>
    </Container>
  );
}
 
export default GutterContainer;