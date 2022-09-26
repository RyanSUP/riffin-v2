import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import { UserContext } from 'containers/CognitoUserProvider/CognitoUserProvider'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import LoginButton from './LoginButton/LoginButton'
import Box from "@mui/material/Box"

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  
  const headerLinks = [      
    {
      "name": "Login",
      "onClick": () => navigate('/login'),
      "icon": (<LoginIcon />),      
      "belongsTo": "avatar",
    },
    {
      "name": "Logout",
      "onClick": () => logout(),
      "icon": (<LogoutIcon />),
      "belongsTo": "avatar",
      "isLoggedInUser": true
    }
  ]

  const buttonStyles = {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'inline-block',    
    justifyContent: 'space-even'
  }

  return (
    <>    
    <Box style={buttonStyles}>
      {user ?
      <AvatarMenu 
        headerLinks={headerLinks.filter((link) => {
          return link.belongsTo === "avatar" && link.isLoggedInUser === true
        })}
      />
      : <LoginButton />
      }
    </Box>
    </>
  )
}

export default HeaderLinks