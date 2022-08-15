// Services
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavLogo from './NavLogo';
import HamburgerMenu from './HamburgerMenu';
import MobileNavLogo from './MobileNavLogo';
import NavLinks from './NavLinks';
import AvatarMenu from './AvatarMenu';
import LoginButton from './LoginButton';

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const settings = ['Logout']; // The links inside the dropdown when a user clicks their avatar
  const pages = [
    {
      "name": 'Trending',
      "path": "/trending"
    },
    {
      "name": 'My Tabs',
      "path": `/profile/${user?.username}`
    },
    {
      "name": 'New Tab',
      "path": user ? "/tablature/new" : "/login"
    },
  ]; // The links on the navbar

  // Handles opening the hamburger menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Handles opening the user avatar menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Handles closing the hamburger menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handles closing the user avatar menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handles closing menu if user outside of the menu
  const handleClickOnPage = (path) => {
    handleCloseNavMenu();
    navigate(path);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <NavLogo />
          <HamburgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
            handleClickOnPage={handleClickOnPage}
            pages={pages}
          />
          <MobileNavLogo />
          <NavLinks
            pages={pages}
            handleClickOnPage={handleClickOnPage}
          />
          {user ?
            <AvatarMenu
              handleOpenUserMenu={handleOpenUserMenu}
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
              settings={settings}
            />
            :
            <LoginButton />
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;