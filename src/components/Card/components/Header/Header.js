// MUI
import { Box, Typography, IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import EditIcon from '@mui/icons-material/Edit';

const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px"
}

const tabNameStyles ={
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "inline", 
  alignSelf: "center",
  width: "50%",
}

const Header = (props) => {
  
  return (
      <Box style={boxStyles}>
        <Typography style={tabNameStyles} >{props.tabName}</Typography>
        <Box sx={{display: "inline"}}>
        <IconButton disabled={props.showOwnerControls}>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        {props.showOwnerControls &&
          <IconButton onClick={props.handleEdit}>
            <EditIcon />
          </IconButton>
        }
        <IconButton onClick={props.handleExpand}>
          {props.isExpanded 
            ?
              <CloseFullscreenRoundedIcon />
            :
              <OpenInFullIcon />
          }
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
