import { React, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { UserContext } from '../../App'
import LoginButton from '../Nav/LoginButton'
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [ links, setLinks ] = useState([])

  const navToNew = () => navigate('/new')
  const navToLogin = () => navigate('/login')
  const navToProfile = () => navigate(`/profile/${user?.username}`)
  
  //  // set state for header links
  // use effect - check if user
  // if user return user links
  // else return non-user links

  
  const headerLinks = [
    {
      "name": "Avatar",
      "onClick" : navToProfile,
      "icon": (<Avatar />),
      "isUser" : true
    },
    {
      "name": "New",
      "onClick": navToNew,
      "icon": (<AddCircleIcon />),
      "isUser" : true
    },
    {
      "name": "Login",
      "onClick": navToLogin,
      "icon": (<LoginButton />),
      "isUser" : false
    }
  ]

  useEffect(() => {
    if (user) { 
      const userLinks = headerLinks.filter((link) => link.isUser === true)
      console.log(`userLinks ${userLinks}`)
      setLinks(userLinks)
    } else if (!user) {
      const nonUserLinks = headerLinks.filter((link) => link.isUser === false)
      console.log(`nonUserLinks ${nonUserLinks}`)
      setLinks(nonUserLinks)
    }
  }, [user])

  return (
    <>
      {links.map((link) => {
        return (
          <Button
          endIcon = {link.icon}
          onClick = {link.onClick}
          >
          </Button>
        )
      })
      }
    </>
    // <>
    //   {user ? userLinks.map((link) => {
    //     if (link.property === "user") {

    //       return (
    //         <Button
    //         endIcon={ link.icon }
    //         onClick={ link.onClick }
    //       >
    //       </Button>
    //     )
    //   }
    //   }) : userLinks.map((link) => {
    //     if (link.property === "nonUser")
    //     return (
    //       <Button
    //         icon={ link.icon }
    //         onClick={ link.onClick }
    //       >
    //       </Button>
    //     )
    //   })
    //   }
    // </>
  )
}

export default HeaderLinks