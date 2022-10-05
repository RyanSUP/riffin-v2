// Components / Hooks
import { useState, useEffect, useContext } from "react";
import { useLocation} from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
import { useTheme } from "@mui/material/styles";


// MUI
import { Box } from "@mui/system";
import { Button, Chip } from "@mui/material";


function TagBar() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState();
  const { deleteTag, clearTags, tags, addTag } = useContext(TagContext);
  const theme = useTheme();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTag(searchInputValue);
    setSearchInputValue("");
  };

  const handleDelete = (tagToDelete) => deleteTag(tagToDelete);

  const handleClearTags = () => clearTags();

  const searchInputStyles = {
    background: "transparent",
    outline: "none",
    border: "none",
    width: "100%",
    height: "100%",
    color: theme.palette.primary.main
  };

  const formStyles = {
    width: "100%",
    height: "100%",
  };

  const inputContainer = {
    display: "flex",
    border: "1px solid #ececec",
    borderRadius: "40px",
    height: "38px",
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
    maxWidth: "100%",
    alignItems: "center",
    padding: '5px'
  };

  useEffect(() => {
    if(location.pathname.startsWith("/new") || location.pathname.startsWith("/edit")) {
      setPlaceholder("add a tag")
    } else {
      setPlaceholder("Search")
    }
  }, [location])

  return (
    <>
      <Box style={inputContainer}>
        {tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            variant="outlined"
            onDelete={() => handleDelete(tag)}
            size="small"
          />
        ))}
        <form onSubmit={handleSubmit} style={formStyles}>
          <input
            style={searchInputStyles}
            value={searchInputValue}
            type="text"
            placeholder={placeholder}
            onChange={(e) => setSearchInputValue(e.target.value)}
          ></input>
        </form>
        {tags.length > 0 && 
        <Button onClick={handleClearTags}>X</Button>}
      </Box>
    </>
  );
}

export default TagBar;
