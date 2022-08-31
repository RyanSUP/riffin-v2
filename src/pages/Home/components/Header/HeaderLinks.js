import { React, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import CustomizedMenus from './CreateMenu'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AvatarMenu from './AvatarMenu';
import { UserContext } from 'containers/CognitoUserProvider/CognitoUserProvider'
import LoginButton from './LoginButton'
import { Logout } from '@mui/icons-material';
import Box from "@mui/material/Box"

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const [ links, setLinks ] = useState([])

  
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
      "belongsTo": "avatar"
    },
    {
      "name": "Logout",
      "onClick": () => logout(),
      "icon": (<AddCircleIcon />),
      "belongsTo": "avatar"
    }
  ]

  useEffect(() => {
    if (user) { 
      const userLinks = headerLinks.filter((link) => link.isUser === true)      
      setLinks(userLinks)
    } else if (!user) {
      const nonUserLinks = headerLinks.filter((link) => link.isUser === false)      
      setLinks(nonUserLinks)
    }
  }, [user])

  const buttonStyles = {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'inline-block',    
    justifyContent: 'space-even'
  }

  return (
    <>    
    <Box style={buttonStyles}>
      <CustomizedMenus
      headerLinks={headerLinks.filter((link) => {
        return link.belongsTo === "create"
      })} 
      />
    </Box>
    <Box style={buttonStyles}>
      {user ?
      <AvatarMenu 
        headerLinks={headerLinks.filter((link) => {
          return link.belongsTo === "avatar"
        })}
      />
      : <LoginButton />
      }
    </Box>
    </>
  )
}

export default HeaderLinks