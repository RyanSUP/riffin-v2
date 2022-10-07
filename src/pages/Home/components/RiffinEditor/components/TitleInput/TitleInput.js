// Components / hooks
import { RiffinEditorDispatch } from "../../RiffinProvider";
import { useContext } from "react";
// MUI
import { TextField } from "@mui/material";

const TitleInput = () => {
  const { dispatch, editor } = useContext(RiffinEditorDispatch);

  /**
   * Dispatches an action to update the tablature title when the user types in the TextField.
   * @param {Object} event - the event being fired. Needed so it can be prevented.
   */
  const handleChange = (event) => {
    event.preventDefault();
    const action = {
      type: 'updateTablatureTitle',
      name: event.target.value
    };
    dispatch(action);
  };

  return (
    <TextField
      label="Title"
      id="standard-basic" 
      variant="standard" 
      onChange={handleChange}
      value={editor.tablature.name || ""}
    />
  );
}
 
export default TitleInput;