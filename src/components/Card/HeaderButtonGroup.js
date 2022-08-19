import { Button, ButtonGroup, Box, IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HeaderButtonGroup = (props) => {
  return (
    <Box sx={{display: "inline"}}>
        <IconButton disabled={props.disableLike}>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <IconButton onClick={props.handleExpand}>
          <OpenInFullIcon />
        </IconButton>
    </Box>
  );
};

export default HeaderButtonGroup;
