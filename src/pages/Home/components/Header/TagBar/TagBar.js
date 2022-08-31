import { useState } from 'react'
import { Box } from "@mui/system"
import { Button, Chip } from "@mui/material"

function TagBar() {
  const [tags, setTags] = useState([])
  const [searchInputValue, setSearchInputValue] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const previousTags = [...tags, searchInputValue]
    setTags(previousTags)
    setSearchInputValue("")
  }

  const handleDelete = (deleteIndex) => {
    const updatedTags = tags.filter((tag, i) => i !== deleteIndex)
    setTags(updatedTags)
  }

  const clearTags = () => setTags([])

  const searchInputStyles = {
    outline: 'none',
    boarder: 'none',
    width: '100%',
    height: '100%'
  }

  const formStyles = {
    width: '100%',
    height: '100%'
  }

  const inputContainer = {
    display: 'flex',
    border: '1px solid #ececec',
    borderRadius: '40px',
    height: '38px',
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
    maxWidth: "100%",
    alignItems: "center"
  }

  return (
    <>
    <Box style={inputContainer}>
      {tags.map((tag, i) => (
        <Chip key={i} label={tag} variant="outlined" onDelete={() => handleDelete(i)} />
      ))}
      <form onSubmit={handleSubmit} style={formStyles}>
        <input
          style={searchInputStyles}
          value={searchInputValue}
          type="text"
          placeholder="search"
          onChange={(e) => setSearchInputValue(e.target.value)}
        ></input>
      </form>
      {tags.length > 0 &&
        <Button onClick={clearTags}>X</Button>
      }
    </Box>    
    </>
  )
}

export default TagBar