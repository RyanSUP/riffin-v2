// MUI
import { Box, Chip } from "@mui/material";

const wrapperBoxStyles = {
  display: "flex",
  justifyContent: "space-between",
}

const tagBoxStyles = {
  display: "flex",
  width: "50%",
  alignItems: "end",
  overflow: "hidden",
}

const Footer = (props) => {
  return (
    <Box style={wrapperBoxStyles}>
        <Box style={tagBoxStyles}>
          {props.tags.map((tag, i) =>(
            <Chip 
              key={i}
              label={tag} 
              size="small" 
            />
          ))}
        </Box>
    </Box>
  );
};

export default Footer;
