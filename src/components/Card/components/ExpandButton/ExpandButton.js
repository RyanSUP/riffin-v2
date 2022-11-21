// Components / hooks
import { useEffect, useState } from "react";
// MUI
import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
/**
 * * A button that toggles icon and text depending on the 'expanded' prop.
 * @param {Object} props - expanded, disabled, handleClick
 * @returns A single button component
 */
const ExpandButton = (props) => {
  const [icon, setIcon] = useState();
  const [text, setText] = useState();
  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  /**
   * Updates button information when props change
   */
  useEffect(() => {
    setIcon(props.expanded ? <FullscreenExitIcon /> : <FullscreenIcon />);
    if(props.disabled) {
      setText("No content");
    } else {
      setText(props.expanded ? "Collapse View" : "Expand view");
    }
  }, [props]);

  return (
    <>
      {aboveMediumScreen ?
        <Button
          disabled={props.disabled}
          variant="outlined"
          size="small"
          onClick={props.onClick} 
          startIcon={icon}
        >
            {text}
        </Button>
      :
        <IconButton
          disabled={props.disabled}
          onClick={props.onClick}
        >
          {icon}
        </IconButton>
      }
    </>
  );
}
 
export default ExpandButton;