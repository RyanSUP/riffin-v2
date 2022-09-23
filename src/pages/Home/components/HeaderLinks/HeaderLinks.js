import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'containers/CognitoUserProvider/CognitoUserProvider'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import LoginButton from './LoginButton/LoginButton'
import Box from "@mui/material/Box"

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  
  const headerLinks = [      
    {
      "name": "Login",
      "onClick": () => navigate('/login'),
      "icon": (<AddCircleIcon />),      
      "belongsTo": "avatar",
    },
    {
      "name": "Logout",
      "onClick": () => logout(),
      "icon": (<AddCircleIcon />),
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