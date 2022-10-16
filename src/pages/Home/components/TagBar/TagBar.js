// Components / Hooks
import { useState, useEffect, useContext } from "react";
import { useLocation} from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
// MUI
import { Chip, TextField, Autocomplete } from "@mui/material";

const TagBar = () => {
  const [placeholder, setPlaceholder] = useState();
  const { usersTags } = useContext(TablatureContext);
  const { tagsInSearchbar, setTagsInSearchbar } = useContext(TagContext);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.startsWith("/new")) {
      setTagsInSearchbar([])
      setPlaceholder("add tag");
    } else if(location.pathname.startsWith("/profile")) {
      setTagsInSearchbar([])
      setPlaceholder("search");
    } else if(location.pathname.startsWith("/edit")) {
      setPlaceholder("add tag");
    } else {
      setTagsInSearchbar([])
      setPlaceholder("search");
    }
  }, [location, setTagsInSearchbar]);

  return (
    <>
      <Autocomplete
        onChange={(event, value) => setTagsInSearchbar(value)}
        multiple
        id="tags-filled"
        options={Object.keys(usersTags).sort((a,b) => usersTags[b] - usersTags[a])}
        freeSolo
        value={tagsInSearchbar}
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
