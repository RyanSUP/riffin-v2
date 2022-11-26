// Components / Hooks
import { useState, useEffect, useContext } from "react";
import { useLocation} from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
// MUI
import { Chip, TextField, Autocomplete } from "@mui/material";

const riffinOptions = [
  {
    label: "Riffin tags",
    value: "Tasters"
  },
  {
    label: "Riffin tags",
    value: "Basters"
  },
  {
    label: "Riffin tags",
    value: "Slick licks"
  },
  {
    label: "Riffin tags",
    value: "Practice"
  },
  {
    label: "Riffin tags",
    value: "🤘"
  },
]

/**
 * * TagBar is the search / addtag input field with autocomplete suggestions based on the tags found in the User's tablature. All data in the tagbar gets pushed up to the TagProvider so other components can access the data in this input field. The tagbar also pulls data from the TagProvider when loading a tablature to edit, allowing it to be preset with that specific tablature's tags.
 * @returns 
 */
const TagBar = () => {
  const [options, setOptions] = useState([]);
  const [placeholder, setPlaceholder] = useState();
  const { usersTablature } = useContext(TablatureContext);
  const { tagsInSearchbar, setTagsInSearchbar } = useContext(TagContext);
  const location = useLocation();

  /**
   * Set the TagProvider state and placeholder text depending on the current location
   */
  useEffect(() => {
    const updateTagsInSearchbarBasedOnLocation = (pathname) => {
      if(!pathname.startsWith("/edit")) {
        setTagsInSearchbar([]);
      }
    };
    const updatePlaceholderTextBasedOnLocation = (pathname) => {
      if(pathname.startsWith("/edit") || pathname.startsWith("/new")) {
        setPlaceholder("add tag");
      } else {
        setPlaceholder("filter by tags or title");
      }
    };
    updateTagsInSearchbarBasedOnLocation(location.pathname);
    updatePlaceholderTextBasedOnLocation(location.pathname);
  }, [location, setTagsInSearchbar]);

  /**
   * Build the options menu, omitting tags that are already in the searchbar.
   */
   useEffect(() => {
    if(usersTablature) {
      const nameOptions = [];
      const tagOptions = [];
      const tagMap = {};
      usersTablature.forEach((tab) => {
        const name = {
          label: "Titles",
          value: tab.name,
          inSearchbar: tagsInSearchbar.includes(tab.name)
        }
        nameOptions.push(name);
        tab.tags.forEach((tag) => {
          if(!tagMap[tag]) {
            tagMap[tag] = true; // Arbitrary value - just setting up a hash.
            tagOptions.push({
              label: "Your tags",
              value: tag,
              inSearchbar: tagsInSearchbar.includes(tag)
            });
          }
        });
      });
      setOptions([...tagOptions, ...nameOptions])
    }
  }, [usersTablature, tagsInSearchbar]);


  return (
    <Autocomplete
      onChange={(event, valueFromAutocomplete) => {
        const tagsFromAutocomplete = valueFromAutocomplete.map((val) => (val["label"]) ? val["value"] : val);
        setTagsInSearchbar([...new Set(tagsFromAutocomplete)]);
      }}
      multiple
      id="tags-filled"
      options={options.filter((option) => !option.inSearchbar)}
      getOptionLabel={(option) => option.value}
      groupBy={(option) => option.label}
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
  );
}

export default TagBar;
