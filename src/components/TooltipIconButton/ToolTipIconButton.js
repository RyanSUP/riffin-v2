// MUI
import { IconButton, Tooltip } from "@mui/material";

const ToolTipIconButton = (props) => {
  return (
    <Tooltip title={props.title}>
      <IconButton onClick={props.onClick}>
        {props.icon}
      </IconButton>
    </Tooltip>
  );
}
 
export default ToolTipIconButton;