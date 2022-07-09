import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { UserContext } from '../../App';
import { useContext } from 'react';
import NavLogo from './NavLogo';
import HamburgerMenu from './HamburgerMenu';
import MobileNavLogo from './MobileNavLogo';
import NavLinks from './NavLinks';
import AvatarMenu from './AvatarMenu';
import LoginButton from './LoginButton';
import { useState } from 'react';
const pages = ['Trending', 'My tabs', 'New tab'];
const settings = ['Logout'];



const Nav = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const { user } = useContext(UserContext);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
            <NavLogo />
            <HamburgerMenu
                handleOpenNavMenu={handleOpenNavMenu}
                anchorElNav={anchorElNav}
                handleCloseNavMenu={handleCloseNavMenu}
                pages={pages}
            />
            <MobileNavLogo />
            <NavLinks 
                pages={pages}
                handleCloseNavMenu={handleCloseNavMenu}
            />
            { user ?
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