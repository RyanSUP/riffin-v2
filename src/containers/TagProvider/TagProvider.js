// Components and hooks
import { createContext, useState } from "react";
const TagContext = createContext([]);

const TagProvider = (props) => {
  const [tagsInSearchbar, setTagsInSearchbar] = useState([])

  return (
    <TagContext.Provider value={{
      setTagsInSearchbar,
      tagsInSearchbar
    }}>
      {props.children}
    </TagContext.Provider>
  );
}
 
export {TagProvider, TagContext};