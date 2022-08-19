import { Box, Typography } from "@mui/material";
import HeaderButtonGroup from "./HeaderButtonGroup";

const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
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
          disableLike={props.ownedByUser}
          handleExpand={props.handleExpand}
        />
      </Box>

  );
};

export default Header;
