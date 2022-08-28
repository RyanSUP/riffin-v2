import React from 'react'
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box"


import HeaderLogo from './HeaderLogo'
import TagInput from './TagInput';
import HeaderLinks from './HeaderLinks';
import AvatarMenu from './AvatarMenu'


const Header = () => {
  const [showUserButtons, setShowUserButtons] = useState(true)
  const { user } = useContext(UserContext)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <HeaderLogo />
      <TagInput />
      <HeaderLinks />      
      {/* <AvatarMenu /> */}
    </Box>
  )
}

export default Header