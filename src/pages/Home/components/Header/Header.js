import React from 'react'
import HeaderLogo from './HeaderLogo'
import HeaderLinks from './HeaderLinks';
import TagBar from './TagBar/TagBar'
import { Grid } from '@mui/material';


const Header = () => {

  return (
    <Grid container>
      <Grid item xs={2}>
        <HeaderLogo />
      </Grid>
      <Grid item xs={8}>        
        <TagBar />
      </Grid>
      <Grid item xs={2}>        
        <HeaderLinks />      
      </Grid>     
    </Grid> 
  )
}

export default Header