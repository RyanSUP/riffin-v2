import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../../App';
import { useContext } from 'react';
const AvatarMenu = (props) => {
    const { logout } = useContext(UserContext);
    return (
        <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={props.anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(props.anchorElUser)}
                    onClose={props.handleCloseUserMenu}
                    >
                    {props.settings.map((setting) => (
                        <MenuItem key={setting} onClick={props.handleCloseUserMenu}>
                            {/* //! Careful here! Currently I only have "logout" in this menu, but if I add any more to the array it will map all of them with the logout function. */}
                            <Typography onClick={logout} textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
    );
}
 
export default AvatarMenu;