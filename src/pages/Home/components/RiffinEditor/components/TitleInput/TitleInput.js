import { RiffinEditorDispatch } from "../../RiffinEditor";
import { useContext } from "react";
import { TextField } from "@mui/material";

const TitleInput = () => {
  const dispatcher = useContext(RiffinEditorDispatch);
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