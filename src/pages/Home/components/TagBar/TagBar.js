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
    setTagsInSearchbar([])
    if(location.pathname.startsWith("/new") || location.pathname.startsWith("/edit")) {
      setPlaceholder("add tag");
    } else {
      setPlaceholder("Search");
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
        renderTags={(value, getTagProps) =>
          tagsInSearchbar.map((option, index) => (
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
