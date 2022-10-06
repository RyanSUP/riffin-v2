// MUI
import { Box, Chip } from "@mui/material";


const tagBoxStyles = {
  display: "flex",
  width: "50%",
  alignItems: "end",
  overflow: "hidden",
}

const TagGroup = (props) => {
  return (
    <Box style={tagBoxStyles}>
      {props.tags?.map((tag, i) =>(
        <Chip 
          key={i}
          label={tag} 
          size="small" 
        />
      ))}
    </Box>
  );
};

export default TagGroup;
