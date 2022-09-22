// Components / hooks
import { useState } from "react";
import {
  updateBlockValue,
  updateTextAreaAttributes,
} from "../../../../utils/EditorUtils";

// MUI
import Slider from "@mui/material/Slider";

const TablatureSizeSlider = (props) => {
  const [sliderValue, setSliderValue] = useState(props.block.cols);

  const updateInputAreaSize = (action) => {
    const inputAction = {
      area: props.block.inputs,
      characterToAdd: " ",
      type: action.type,
      stepCount: action.stepCount,
      cols: props.block.cols,
    };
    props.block.inputs = updateBlockValue(inputAction);
  };

  const updateDashAreaSize = (action) => {
    const dashAction = {
      area: props.block.dashes,
      characterToAdd: "-",
      type: action.type,
      stepCount: action.stepCount,
      cols: props.block.cols,
    };
    props.block.dashes = updateBlockValue(dashAction);
  };

  const updateBlockProperties = (action) => {
    // ! Update the string count when bass tabs are implemented
    const textAreaAction = {
      cols: props.block.cols,
      maxLength: props.block.maxLength,
      type: action.type,
      stepCount: action.stepCount,
      stringCount: 6,
    };
    const { cols, maxLength } = updateTextAreaAttributes(textAreaAction);
    props.block.cols = cols;
    props.block.maxLength = maxLength;
  };

  const updateBlockSize = (action) => {
    updateInputAreaSize(action);
    updateDashAreaSize(action);
    updateBlockProperties(action);
    props.refreshTablatureObject();
  };

  const handleSliderChange = (event, value) => {
    if (value === sliderValue) {
      return;
    }

    const difference = value - sliderValue;
    if (difference > 0) {
      updateBlockSize({
        type: "increase",
        stepCount: difference,
      });
    } else {
      updateBlockSize({
        type: "decrease",
        stepCount: difference,
      });
    }

    setSliderValue((prev) => prev + difference);
  };
  return (
    <Slider
      aria-label="Temperature"
      value={sliderValue}
      step={5}
      marks
      onChange={handleSliderChange}
      min={20}
      max={80}
    />
  );
};

export default TablatureSizeSlider;
