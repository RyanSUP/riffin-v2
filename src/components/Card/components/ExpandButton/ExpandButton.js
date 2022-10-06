// Components / hooks
import { useEffect, useState } from "react";
// MUI
import { Button } from "@mui/material";
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

  /**
   * Updates button information when props change
   */
  useEffect(() => {
    setIcon(props.expanded ? <FullscreenExitIcon /> : <FullscreenIcon />);
    setText(props.expanded ? "Collapse View" : "Expand View");
  }, [props]);

  return (
    <Button
      disabled={props.disabled}
      variant="outlined" 
      size="small" 
      onClick={props.onClick} 
      endIcon={icon}
    >
        {text}
    </Button>
  );
}
 
export default ExpandButton;