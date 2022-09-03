// Components
import OfficialNavPlus from './components/OfficialNavPlus/OfficialNavPlus';
import ContentRoutes from "./components/ContentRoutes/ContentRoutes";
import Header from './components/Header/Header';
import { useState } from 'react';

// MUI
import { Grid } from "@mui/material";

const Home = () => {
  const [tags, setTags] = useState([])
  const [tagBarTitle, setTagBarTitle] = useState("Search")

  const changeTagBarTitle = (newTitle) => setTagBarTitle(newTitle)

  const addTag = (tag) => {
    if(tags.includes(tag) || tag === '' || tag === ' ') {
      return
    }
    const previousTags = [...tags, tag]
    setTags(previousTags)
  }

  const deleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

  const clearTags = () => setTags([])

  return (
    <div data-testid="Home">
      <Grid container>
        <Grid item xs={12}>
          <Header 
            addTag={addTag}
            deleteTag={deleteTag}
            clearTags={clearTags}
            tags={tags}
            tagBarTitle={tagBarTitle}
          />
        </Grid>
        <Grid item xs={2}>                
          <OfficialNavPlus 
            addTag={addTag}
          />
        </Grid>
        <Grid item xs={8}>
          <ContentRoutes 
            changeTagBarTitle={setTagBarTitle}
            tags={tags}
          />
        </Grid>
        <Grid item xs={2}>
          Ad
        </Grid>
      </Grid>
    </div>
  );
}
 
export default Home;