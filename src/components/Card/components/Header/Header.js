// Components / hooks
import EditIconButton from "../EditIconButton/EditIconButton";
import ShareIconButton from "../ShareIconButton/ShareIconButton";
import ToggledIconButton from "components/ToggledIconButton/ToggledIconButton";

// MUI
import { Box, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";

const boxStyles = {
  display: "flex",
  marginBottom: "5px"
}

const tabNameStyles ={
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "inline", 
  alignSelf: "center",
  maxWidth: "70%",
}

const Header = (props) => {
  return (
    <Box style={boxStyles}>
      <Typography style={tabNameStyles} >{props.tabData.name}</Typography>
      <Box sx={{display: "inline"}}>
        {props.tabData.likeCount > 0 &&
          <span>{props.tabData.likeCount}</span>
        }
        <ShareIconButton />
        <EditIconButton tab_id={props.tabData._id}/>
        <ToggledIconButton
          isDisabled={false}
          iconA={<CloseFullscreenRoundedIcon />}
          titleA={""}
          iconB={<OpenInFullIcon />}
          titleB={"Expand"}
          startOnA={props.isExpanded}
          handleClickA={props.handleExpand}
          handleClickB={props.handleExpand}
        />
      </Box>
    </Box>
  );
};

export default Header;
