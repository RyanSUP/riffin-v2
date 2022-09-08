// Components / hooks
import EditIconButton from "../EditIconButton/EditIconButton";
import FavoriteIconButton from "../FavoriteIconButton/FavoriteIconButton";
import ShareIconButton from "../ShareIconButton/ShareIconButton";
import ToggledIconButton from "components/ToggledIconButton/ToggledIconButton";

// MUI
import { Box, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";

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
      <Typography style={tabNameStyles} >{props.tabData.name}</Typography>
      <Box sx={{display: "inline"}}>
        <FavoriteIconButton 
          isDisabled={props.isOwnedByUser} 
          tab_id={props.tabData._id}
        />
        <ShareIconButton />
        {props.isOwnedByUser &&
          <EditIconButton tab_id={props.tabData._id}/>
        }
        <ToggledIconButton
          iconA={<CloseFullscreenRoundedIcon />}
          titleA={""}
          iconB={<OpenInFullIcon />}
          titleB={"Expand"}
          startOnA={props.isExpanded}
          handleClick={props.handleExpand}
        />
      </Box>
    </Box>
  );
};

export default Header;
