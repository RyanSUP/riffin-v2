import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import { UserContext } from 'containers/CognitoUserProvider/CognitoUserProvider'
import LoginButton from './LoginButton/LoginButton'
import { Box, Button } from "@mui/material"

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  
  const headerLinks = [    
    {
      "name": "New Guitar Tab",
      "onClick": () => navigate('/new'),
      "icon": (<AddCircleIcon />),
      "belongsTo" : "create"
    },
    {
      "name": "New Bass Tab",
      "onClick": () => navigate('/new'),
      "icon": (<AddCircleIcon />),
      "belongsTo" : "create"
    },
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

  return (
    <Box sx={{display: "flex", justifyContent: "space-around"}}>
      <>    
        {user ?
        <AvatarMenu 
          headerLinks={headerLinks.filter((link) => {
            return link.belongsTo === "avatar" && link.isLoggedInUser === true
          })}
        />
        : <LoginButton />
        }
      </>
      <Button variant="outlined">Donate</Button>
    </Box>
  )
}

export default HeaderLinks