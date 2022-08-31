// Services
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useState, useContext } from "react";

// Components
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const AvatarMenu = (props) => {
  const { logout } = useContext(UserContext);  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useContext(UserContext);  

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
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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

export default AvatarMenu;
