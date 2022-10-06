// MUI
import { Box, Chip, TextField } from "@mui/material";


const tagContainer = {
  display: "flex",
  width: "50%",
  alignItems: "end",
  overflow: "hidden",
  mb: 1
};

const spacer = {
  mr: 1,
  mb: 1,
}

const TagGroup = (props) => {
  return (
    <Box sx={tagContainer}>
      {props.tags?.map((tag, i) =>(
        <Box sx={spacer}>
          <Chip 
            sx={{textTransform: "none"}}
            key={i}
            label={tag} 
            size="small"
            variant="outlined"
          />
        </Box>
      ))}
    </Box>
  );
};

export default TagGroup;
