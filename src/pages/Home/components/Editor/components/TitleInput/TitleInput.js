import { TextField } from "@mui/material";

const TitleInput = (props) => {

  const handleChange = (event) => {
    event.preventDefault();
    props.tablature.name = event.target.value;
    props.refreshTablatureObject();
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