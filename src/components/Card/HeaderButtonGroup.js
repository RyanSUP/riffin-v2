import { Button, Box } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShareIcon from "@mui/icons-material/Share";

const HeaderButtonGroup = (props) => {
  return (
    <Box sx={{display: "inline"}}>
      <Button disabled={props.disableLike}>🤘</Button>
      <Button startIcon={<ShareIcon />} />
      <Button startIcon={<OpenInFullIcon onClick={props.handleExpand} />} />
    </Box>
  );
};

export default HeaderButtonGroup;
