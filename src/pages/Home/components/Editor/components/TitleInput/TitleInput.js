import { useTheme } from "@mui/material/styles";

const TitleInput = (props) => {
  const theme = useTheme();
  const dashesStyle = {
    background: "transparent",
    margin: 0,
    outline: "none",
    border: "none",
    fontSize: "1.2rem",
    padding: 0,
    color: theme.palette.primary.main,
  };
  const handleChange = (event) => {
    event.preventDefault();
    props.tablature.name = event.target.value;
    props.refreshTablatureObject();
  };
  return (
    <input
      autocomplete="off"
      type="text"
      name="name"
      value={props.tablature.name}
      onChange={handleChange}
      placeholder="A tasty lick"
      style={dashesStyle}
    />
  );
}
 
export default TitleInput;