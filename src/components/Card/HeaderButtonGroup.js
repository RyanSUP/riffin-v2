import { Box, IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";

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
          {props.isExpanded 
            ?
              <CloseFullscreenRoundedIcon />
            :
              <OpenInFullIcon />
          }
        </IconButton>
    </Box>
  );
};

export default HeaderButtonGroup;
