import { React, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import CustomizedMenus from './CreateMenu'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import AvatarMenu from './AvatarMenu';
import { UserContext } from '../../App'
import LoginButton from '../Nav/LoginButton'
import { Logout } from '@mui/icons-material';

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const [ links, setLinks ] = useState([])

  const navToNew = () => navigate('/new')
  const navToLogin = () => navigate('/login')
  const navToProfile = () => navigate(`/profile/${user?.username}`)
  
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

  return (
    <>
      <CustomizedMenus
        headerLinks={headerLinks.filter((link) => {
          return link.belongsTo === "create"
        })} 
      />
      {user ?
      <AvatarMenu 
        headerLinks={headerLinks.filter((link) => {
          return link.belongsTo === "avatar"
        })}
      />
      : <LoginButton />
      }
    </>

  )
}

export default HeaderLinks