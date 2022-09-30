// Components / hooks
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinEditor";
import { useState, useContext } from "react";
import {MAX_BLOCK_COLS, MIN_BLOCK_COLS} from "../../../../../../EditorConfig";
// MUI
import Slider from '@mui/material/Slider';

const SizeSlider = (props) => {
  const [sliderValue, setSliderValue] = useState(props.block.cols);
  const dispatch = useContext(RiffinEditorDispatch); 
  const handleSliderChange = (event, value) => {
    if(value === sliderValue) { 
      return;
    }
    const difference = value - sliderValue;
    let type = (difference > 0) ? "increaseBlockSize" : "decreaseBlockSize"
    const action = {
      OGBlock: props.block,
      type: type,
      stepCount: difference,
    };
    setSliderValue((prev) => prev + difference);
    dispatch(action);
  };

  return (
    <Slider
      aria-label="Columns in tablature"
      value={sliderValue}
      step={5}
      marks
      onChange={handleSliderChange}
      min={MIN_BLOCK_COLS}
      max={MAX_BLOCK_COLS}
    />
  );
}
 
export default SizeSlider;