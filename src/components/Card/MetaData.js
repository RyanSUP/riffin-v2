// Components
import { Avatar, Box, Link, Chip } from "@mui/material";

const wrapperBoxStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px"

}

const tagBoxStyles = {
  display: "flex",
  justifyContent: "space-between",
  width: "50%",
  alignItems: "end",
  overflow: "hidden",
}

const userBoxStyles = {
  display: "flex",
  width: "50%",
  justifyContent: "end"
}

const userLinkStyles = {
  alignSelf: "end",
  marginRight: "12px"
}

const MetaData = (props) => {
  return (
    <Box style={wrapperBoxStyles}>
        <Box style={tagBoxStyles}>
          <Chip 
            label="Deletable" 
            size="small" 
            onDelete={()=> console.log("Delete")} 
          />
          <Chip 
            label="Deletable" 
            size="small" 
            onDelete={()=> console.log("Delete")} 
          />
          <Chip 
            label="Deletable" 
            size="small" 
            onDelete={()=> console.log("Delete")} 
          />
        </Box>
        <Box style={userBoxStyles}>
          <Link 
            underline="hover"
            style={userLinkStyles} 
            href={`/profile/${props.user}`}
          >
            by {props.preferredUsername}
          </Link>
          <Avatar />
        </Box>
    </Box>
  );
};

export default MetaData;
