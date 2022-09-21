// Components
import Sidebar from './components/Sidebar/Sidebar';
import ContentRoutes from "./components/ContentRoutes/ContentRoutes";
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import TagBar from './components/TagBar/TagBar';
import { useState } from 'react';

// MUI
import { Grid } from "@mui/material";

const Home = () => {
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
    <div data-testid="Home">
      <Grid container>

        <Grid item xs={12}>
          <Grid container sx={{alignItems: "center"}}>

            <Grid item xs={2}>
              <HeaderLogo />
            </Grid>

            <Grid item xs={8}>        
              <TagBar 
                addTag={addTag}
                deleteTag={deleteTag}
                clearTags={clearTags}
                tags={tags}
              />
            </Grid>

            <Grid item xs={2}>        
              <HeaderLinks />      
            </Grid>
            
          </Grid> 
        </Grid>

        <Grid item xs={2}>                
          <Sidebar 
            addTag={addTag}
          />
        </Grid>

        <Grid item xs={8}>
          <ContentRoutes 
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