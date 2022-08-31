import React from 'react'
import { useContext, useState } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import Box from "@mui/material/Box"
import HeaderLogo from './HeaderLogo'
import HeaderLinks from './HeaderLinks';
import AvatarMenu from './AvatarMenu'
import TagBar from './TagBar/TagBar'
import { Grid } from '@mui/material';


const Header = () => {
  const [showUserButtons, setShowUserButtons] = useState(true)
  const { user } = useContext(UserContext)

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