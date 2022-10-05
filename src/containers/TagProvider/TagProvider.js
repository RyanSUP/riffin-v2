// Components and hooks
import { createContext, useState } from "react";

const TagContext = createContext([]);

const TagProvider = (props) => {
  const [tags, setTags] = useState([])

  return (
    <TagContext.Provider value={{
      setTags,
      tags
    }}>
      {props.children}
    </TagContext.Provider>
  );
}
 
export {TagProvider, TagContext};