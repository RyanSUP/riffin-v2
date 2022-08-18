// Services
import { useRef } from "react";

const Bar = ({
  index,
  bar,
  handleClickedBar,
  setBarInTablature,
  handleKeyUpInBar,
}) => {
  const inputRef = useRef(); // This is used to know which bar the user has selected.

  return (
    <form className="riffin-editor">
      <textarea
        style={{ resize: "none" }}
        value={bar.inputs}
        onChange={(event) => setBarInTablature(event)}
        onKeyUp={(event) => handleKeyUpInBar(event)}
        onPaste={(event) => event.preventDefault()}
        onClick={(event) => handleClickedBar(event, index, inputRef)}
        cols="40"
        rows="6"
        maxLength="251"
        id="riffin-editor-inputGrid"
        ref={inputRef}
      ></textarea>
      <textarea
        readOnly={true}
        style={{ resize: "none" }}
        value={bar.dashes}
        cols="40"
        rows="6"
        maxLength="251"
        id="riffin-editor-dashGrid"
      ></textarea>
    </form>
  );
};

export default Bar;
