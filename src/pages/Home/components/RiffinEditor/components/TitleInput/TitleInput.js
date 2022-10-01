// Components / hooks
import { RiffinEditorDispatch } from "../../RiffinEditor";
import { useContext } from "react";
// MUI
import { TextField } from "@mui/material";

const TitleInput = () => {
  const dispatcher = useContext(RiffinEditorDispatch);

  /**
   * Dispatches an action to update the tablature title when the user types in the TextField.
   * @param {Object} event - the event being fired. Needed so it can be prevented.
   */
  const handleChange = (event) => {
    event.preventDefault();
    const action = {
      type: 'updateTablatureTitle',
      name: event.target.value
    }
    dispatcher(action);
  };

  return (
    <TextField
      id="standard-basic" 
      variant="standard" 
      placeholder="Title"
      onChange={handleChange}
    />
  );
}
 
export default TitleInput;