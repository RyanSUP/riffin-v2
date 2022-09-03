// Components / hooks
import { useState } from "react";
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";

const ToggledIconButton = (props) => {
  const [showIconA, setShowIconA] = useState(
    props.startOnA === undefined || props.startOnA === true
    ? true
    : false
  )

  const titleA = props.titleA === undefined ? "" : props.titleA
  const titleB = props.titleB === undefined ? "" : props.titleB

  const handleClick = () => {
    props.handleClick()
    setShowIconA(!showIconA)
  }

  return (
    <>
      {showIconA
        ?
          <TooltipIconButton
            title={titleA}
            icon={props.iconA}
            onClick={handleClick}
          />
        :
          <TooltipIconButton
            title={titleB}
            icon={props.iconB}
            onClick={handleClick}
          />
      }
    </>
  );
}
 
export default ToggledIconButton;