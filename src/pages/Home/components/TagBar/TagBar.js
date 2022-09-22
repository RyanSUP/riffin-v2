// Components / Hooks
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// MUI
import { Box } from "@mui/system";
import { Button, Chip } from "@mui/material";

function TagBar(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const location = useLocation();
  const [placeholder, setPlaceholder] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTag(searchInputValue);
    setSearchInputValue("");
  };

  const handleDelete = (tagToDelete) => props.deleteTag(tagToDelete);

  const handleClearTags = () => props.clearTags();

  const searchInputStyles = {
    background: "transparent",
    outline: "none",
    boarder: "none",
    width: "100%",
    height: "100%",
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
  };

  useEffect(() => {
    if (location.pathname.startsWith("/new")) {
      setPlaceholder("add a tag");
    } else {
      setPlaceholder("Search");
    }
  }, [location]);

  return (
    <>
      <Box style={inputContainer}>
        {props.tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            variant="outlined"
            onDelete={() => handleDelete(tag)}
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
        {props.tags.length > 0 && <Button onClick={handleClearTags}>X</Button>}
      </Box>
    </>
  );
}

export default TagBar;
