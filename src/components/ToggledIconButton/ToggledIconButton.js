// Components / hooks
import { useState, useEffect } from "react";
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";

const ToggledIconButton = (props) => {
  const [showIconA, setShowIconA] = useState(
    props.startOnA === undefined || props.startOnA === true ? true : false
  );

  const titleA = props.titleA === undefined ? "" : props.titleA;
  const titleB = props.titleB === undefined ? "" : props.titleB;

  const handleClick = () => {
    if (showIconA) {
      props.handleClickA();
    } else {
      props.handleClickB();
    }
    setShowIconA(!showIconA);
  };

  useEffect(() => {
    setShowIconA(
      props.startOnA === undefined || props.startOnA === true ? true : false
    );
  }, [props.startOnA]);

  return (
    <>
      {showIconA ? (
        <TooltipIconButton
          isDisabled={props.isDisabled}
          title={titleA}
          icon={props.iconA}
          onClick={handleClick}
        />
      ) : (
        <TooltipIconButton
          isDisabled={props.isDisabled}
          title={titleB}
          icon={props.iconB}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default ToggledIconButton;
