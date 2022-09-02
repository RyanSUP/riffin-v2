// MUI
import { IconButton, Tooltip } from "@mui/material";

const TooltipIconButton = (props) => {
  return (
    <Tooltip title={props.title}>
      <IconButton onClick={props.onClick}>
        {props.icon}
      </IconButton>
    </Tooltip>
  );
}
 
export default TooltipIconButton;