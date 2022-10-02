// Components and hooks
import { createContext, useState } from "react";

const TagContext = createContext([]);

const TagProvider = (props) => {
  const [tags, setTags] = useState([])

  const addTag = (tag) => {
    if(tags.includes(tag) || tag === '' || tag === ' ') {
      return
    }
    setTags((prev)=> [...prev, tag])
  }

  const deleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

  const clearTags = () => setTags([])

  return (
    <TagContext.Provider value={{
      addTag,
      deleteTag,
      clearTags,
      tags
    }}>
      {props.children}
    </TagContext.Provider>
  );
}
 
export {TagProvider, TagContext};