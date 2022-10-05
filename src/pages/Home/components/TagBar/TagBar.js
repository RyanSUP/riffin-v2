// Components / Hooks
import { useState, useEffect, useContext } from "react";
import { useLocation} from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
// MUI
import { Chip, TextField, Autocomplete } from "@mui/material";

// TODO Generate a list of the users unique tags
const testTagSuggestions = [
  "Tasters",
  "Basters",
  "Slick Licks",
  "Rock",
  "Zep",
  "Metal",
  "Slap Bass",
  "Country",
  "Blues",
  "Folk",
  "Pop",
  "Hip Hop",
  "R&B",
  "Metallica",
  "AC/DC",
]

function TagBar() {
  const [placeholder, setPlaceholder] = useState();
  const { setTagsInSearchbar } = useContext(TagContext);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.startsWith("/new") || location.pathname.startsWith("/edit")) {
      setPlaceholder("add tag");
    } else {
      setPlaceholder("Search");
    }
  }, [location]);

  return (
    <>
     <Autocomplete
        onChange={(event, value) => setTagsInSearchbar(value)}
        multiple
        id="tags-filled"
        options={testTagSuggestions.map((tag) => tag)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
}

export default TagBar;
