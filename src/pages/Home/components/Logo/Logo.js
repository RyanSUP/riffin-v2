import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
// Images
import logo from "../../../../assets/images/riffin_logo.png";
import mobileLogo from "../../../../assets/images/riffin_mobile_logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();
  const belowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()
  const handleClick = () => navigate("/")
  return (
    <>
      { belowMediumScreen ?
          <img src={mobileLogo} alt="logo" style={{width: "45px", cursor: 'pointer'}} onClick={handleClick}/>
        :
          <Box sx={{display: "flex", cursor: 'pointer'}} onClick={handleClick}>
            <img src={logo} alt="logo" style={{width: "45px"}}/>
            <Typography sx={{alignSelf: 'center'}} style={theme.typography.logo}>Riffin</Typography>
          </Box>
      }
    </>
  );
};

export default Logo;
