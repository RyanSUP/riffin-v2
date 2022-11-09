// Components / hooks
import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'containers/CognitoUserProvider/CognitoUserProvider'
import LoginButton from './LoginButton/LoginButton'
import UserMenu from './UserMenu/UserMenu';
// MUI
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import RefreshIcon from '@mui/icons-material/Refresh';

const HeaderLinks = () => {
  const navigate = useNavigate()
  const { user, logout, changePassword } = useContext(UserContext)
  
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
    },
    {
      "name": "Change Password",
      "onClick": () => navigate('/changePassword'),
      "icon": (<RefreshIcon />),
      "belongsTo": "avatar",
      "isLoggedInUser": true
    }
  ]

  return (
    <>
      {user ?
      <UserMenu
        headerLinks={headerLinks.filter((link) => {
          return link.belongsTo === "avatar" && link.isLoggedInUser === true
        })}
      />
      : <LoginButton />
      }
    </>
  )
}

export default HeaderLinks