// Components / Hooks
import { useState, useEffect, useContext } from "react";
import { useLocation} from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
// MUI
import { Chip, TextField, Autocomplete } from "@mui/material";

/**
 * * TagBar is the search / addtag input field with autocomplete suggestions based on the tags found in the User's tablature. All data in the tagbar gets pushed up to the TagProvider so other components can access the data in this input field. The tagbar also pulls data from the TagProvider when loading a tablature to edit, allowing it to be preset with that specific tablature's tags.
 * @returns 
 */
const TagBar = () => {
  // const [tagSuggestions, setTagSuggestions] = useState({});
  // const [nameSuggestions, setNameSuggestions] = useState({});
  const [options, setOptions] = useState([]);
  const [placeholder, setPlaceholder] = useState();
  const { usersTablature } = useContext(TablatureContext);
  const { tagsInSearchbar, setTagsInSearchbar } = useContext(TagContext);
  const location = useLocation();

  /**
   * Set the TagProvider state and placeholder text depending on the current location
   */
  useEffect(() => {
    if(location.pathname.startsWith("/new")) {
      setTagsInSearchbar([]);
      setPlaceholder("add tag");
    } else if(location.pathname.startsWith("/profile")) {
      setTagsInSearchbar([]);
      setPlaceholder("search");
    } else if(location.pathname.startsWith("/edit")) {
      setPlaceholder("add tag");
    } else {
      setTagsInSearchbar([]);
      setPlaceholder("search");
    }
  }, [location, setTagsInSearchbar]);

  // /**
  //  * Update tagSuggestions when usersTablature changes. This keeps the tagbar suggestions up to date.
  //  */
  //  useEffect(() => {
  //   if(usersTablature) {
  //     const tagMapWithCount = {};
  //     const tablatureNames = [];
  //     usersTablature.forEach((tab) => {
  //       tablatureNames.push(tab.name);
  //       tab.tags.forEach((tag) => {
  //         if(tagMapWithCount[tag]) {
  //           tagMapWithCount[tag] = tagMapWithCount[tag] + 1;
  //         } else {
  //           tagMapWithCount[tag] = 1;
  //         }
  //       });
  //       setNameSuggestions(tablatureNames);
  //       setTagSuggestions(tagMapWithCount);
  //     });
  //   }
  // }, [usersTablature]);

  /**
   * Update tagSuggestions when usersTablature changes. This keeps the tagbar suggestions up to date.
   */
   useEffect(() => {
    if(usersTablature) {
      const nameSuggestions = [];
      const tagMapWithCount = {};
      usersTablature.forEach((tab) => {

        const name = {
          label: "Tablature",
          value: tab.name
        }
        nameSuggestions.push(name);

        tab.tags.forEach((tag) => {
          if(tagMapWithCount[tag]) {
            tagMapWithCount[tag] = tagMapWithCount[tag] + 1;
          } else {
            tagMapWithCount[tag] = 1;
          }
        });
      });
      let tagSuggestions = Object.keys(tagMapWithCount).sort((a,b) => tagMapWithCount[b] - tagMapWithCount[a]);
      tagSuggestions = Object.keys(tagMapWithCount).map((tag) => {
        return {
          label: "Tags",
          value: tag
        }
      })
      setOptions([...tagSuggestions, ...nameSuggestions])
    }
  }, [usersTablature]);


  return (
    <Autocomplete
      onChange={(event, value) => setTagsInSearchbar(value)}
      multiple
      id="tags-filled"
      options={options}
      getOptionLabel={(option) => option.value}
      groupBy={(option) => option.label}
      freeSolo
      value={tagsInSearchbar}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" size="small" label={option.value} {...getTagProps({ index })} />
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
