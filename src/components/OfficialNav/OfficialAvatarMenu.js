// Services
import { UserContext } from '../../App';
import { useContext } from 'react';

// Components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const OfficialAvatarMenu = (props) => {
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
            {/* This is mapping the Nav component's settings' array. If anything else is added to settings, the onClick will have to be fixed as it currently maps them all to 'logout'.  */}
            {props.settings.map((setting) => (
                <MenuItem key={setting} onClick={props.handleCloseUserMenu}>
                    <Typography onClick={logout} textAlign="center">{setting}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </Box>
    );
}
 
export default OfficialAvatarMenu;