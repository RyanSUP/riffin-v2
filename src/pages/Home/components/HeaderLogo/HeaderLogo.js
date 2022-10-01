import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
// Images
import logo from "../../../../assets/images/riffin_logo.png";
import mobileLogo from "../../../../assets/images/riffin_mobile_logo.png";

const HeaderLogo = () => {
  const theme = useTheme();
  const belowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      { belowMediumScreen ?
          <img src={mobileLogo} alt="logo" style={{width: "45px"}}/>
        :
          <Box sx={{display: "flex"}}>
            <img src={logo} alt="logo" style={{width: "45px"}}/>
            <Typography style={theme.typography.logo}>Riffin</Typography>
          </Box>
      }
    </>
  );
};

export default HeaderLogo;
