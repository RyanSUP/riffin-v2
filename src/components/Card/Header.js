// Components and hooks
import HeaderButtonGroup from "./HeaderButtonGroup";

// MUI
import { Box, Typography } from "@mui/material";

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
        <HeaderButtonGroup
          handleEdit={props.handleEdit}
          showOwnerControls={props.ownedByUser}
          handleExpand={props.handleExpand}
          isExpanded={props.isExpanded}
        />
      </Box>

  );
};

export default Header;
