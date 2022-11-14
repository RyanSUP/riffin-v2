// Services
import { useState} from "react";
// Components
import Box from "@mui/material/Box";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";

const UserMenu = (props) => {
  // const { logout } = useContext(UserContext);  
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const { user } = useContext(UserContext);  

  // Handles opening the user avatar menu
  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorElUser(event.currentTarget);
  };

  // Handles closing the user avatar menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = (onClick) => {
    setAnchorElUser(null);
    onClick();
  }
  return (
    <Box>
      <Tooltip title="user settings">
        <IconButton onClick={handleOpenUserMenu}  sx={{color: "primary.main", borderRadius: '25%'}}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {props.headerLinks?.map((link, i) => {
          return(
            <MenuItem onClick={() => handleMenuItemClick(link.onClick)} key={i} disableRipple>
              {link.icon}
              {link.name}
            </MenuItem>
          )
        })}        
      </Menu>
    </Box>
  );
};

export default UserMenu;
