// Components / hooks
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
import { useState, useContext, useEffect } from "react";
import {MAX_BLOCK_COLS, MIN_BLOCK_COLS} from "../../../../EditorConfig";
// MUI
import Slider from '@mui/material/Slider';

/**
 * Checks if the block is at the maximum number of columns set by the EditorConfig.
 * @param {Number} cols - the number of current columns in the block
 * @returns true if the number of columns equals the maximum columns. Otherwise returns false.
 */
const blockSizeAtMax = (cols) => (cols === MAX_BLOCK_COLS);

/**
 * Checks if the block is at the minimum number of columns set by the EditorConfig.
 * @param {Number} cols - the number of current columns in the block
 * @returns true if the number of columns equals the minimum columns. Otherwise returns false.
 */
const blockSizeAtMin = (cols) => (cols === MIN_BLOCK_COLS);

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
    const difference = value - sliderValue;
    let type = (difference > 0) ? "increaseBlockSize" : "decreaseBlockSize"
    if(type === "increaseBlockSize" && blockSizeAtMax(props.block?.cols)) {
      return;
    }
    if(type === "decreaseBlockSize" && blockSizeAtMin(props.block?.cols)) {
      return;
    }
    const action = {
      OGBlock: props.block,
      type: type,
      stepCount: difference,
    };
    setSliderValue((prev) => prev + difference);
    dispatch(action);
  };

  useEffect(() => {
    setSliderValue(props.block.cols);
  }, [props.block])

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
    />
  );
}
 
export default SizeSlider;