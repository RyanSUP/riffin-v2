// Components / hooks
import { useState } from "react";
import ToolTipIconButton from "components/TooltipIconButton/ToolTipIconButton";

const ToggledIconButton = (props) => {
  const [showIconA, setShowIconA] = useState(props.startOnA)
  
  const handleClick = () => {
    props.handleClick()
    setShowIconA(!showIconA)
  }

  return (
    <>
      {showIconA
        ?
          <ToolTipIconButton
            title={props.titleA}
            icon={props.iconA}
            onClick={handleClick}
          />
        :
          <ToolTipIconButton
            title={props.titleB}
            icon={props.iconB}
            onClick={handleClick}
          />
      }
    </>
  );
}
 
export default ToggledIconButton;