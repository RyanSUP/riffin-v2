// Components
import Sidebar from './components/Sidebar/Sidebar';
import ContentRoutes from "./components/ContentRoutes/ContentRoutes";
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import TagBar from './components/TagBar/TagBar';
import { useState } from 'react';

// Images
import adImage from '../../assets/images/fake_ad.png'

// MUI
import { Grid, Box, Container } from "@mui/material";

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
          <Grid container sx={{alignItems: "center", my: "16px"}}>

            <Grid item xs={2}>
              <Container>
                <HeaderLogo />
              </Container>
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
              <Container>
                <HeaderLinks />
              </Container>
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
          <Box sx={{textAlign: "right", marginTop: "100px"}}>
            <a target="_blank" rel="noreferrer" href={'https://www.linkedin.com/in/ryanmorici/'}>
              <img src={adImage} alt="advertisement" style={{maxWidth: "175px"}}/>
            </a>
          </Box>
        </Grid>

      </Grid>
    </div>
  );
}
 
export default Home;