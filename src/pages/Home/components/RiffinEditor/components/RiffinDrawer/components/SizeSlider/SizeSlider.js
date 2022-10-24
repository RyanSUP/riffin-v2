// Components / hooks
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
import { useState, useContext, useEffect } from "react";
import {MAX_BLOCK_COLS, MIN_BLOCK_COLS} from "../../../../EditorConfig";
// MUI
import Slider from '@mui/material/Slider';


/**
 * Checks if the slider value is beyond MAX_BLOCK_COLS or MIN_BLOCK_COLS, which can happen if the user handles the slider like a maniac.
 * @param {Number} value 
 * @returns True if the slider value is out of bounds, false otherwise.
 */
const sliderIsOutOfBounds = (value) => {
  if(value > MAX_BLOCK_COLS) return true;
  if(value < MIN_BLOCK_COLS) return true;
  return false;
}

/**
 * * This is the slider that allows the user to change the size of the tablature.
 * props: block. This needs to be the block object from state.tablature, not state.selectedBlock, otherwise the slider value lags behind the actual position. I believe this is because reducers only run during rendering.
 */

const SizeSlider = (props) => {
  const { dispatch } = useContext(RiffinEditorDispatch); 
  const [sliderValue, setSliderValue] = useState(props.block?.cols);

  /**
   * Dispatches an increaseBlockSize or decreaseBlockSize action to the editor reducer.
   * @param {Object} event - this value can be ignored but is necessary according to the MUI documentation for the Slider component.
   * @param {Number} value - the current value of the Slider (provided by the MUI Slider component).
   * @returns - no return value.
   */
  const handleSliderChange = (event, value) => {
    if(value === sliderValue) { 
      return;
    }
    let difference = value - sliderValue;
    const valueOfSliderAfterChange = difference + props.block.cols;
    if(sliderIsOutOfBounds(valueOfSliderAfterChange)) {
      return;
    }
    const action = {
      OGBlock: props.block,
      type: (difference > 0) ? "increaseBlockSize" : "decreaseBlockSize",
      stepCount: difference,
    };
    setSliderValue((prev) => prev + difference);
    dispatch(action);
  };

  useEffect(() => {
    setSliderValue(props.block.cols);
  }, [props.block]);

  return (
    <Slider
      disabled={!props.block?.cols}
      aria-label="Columns"
      value={sliderValue}
      step={5}
      marks
      onChange={handleSliderChange}
      min={MIN_BLOCK_COLS}
      max={MAX_BLOCK_COLS}
      color="tabInput"
    />
  );
}
 
export default SizeSlider;