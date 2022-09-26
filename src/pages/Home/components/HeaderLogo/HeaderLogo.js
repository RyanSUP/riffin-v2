import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
// Images
import logo from "../../../../assets/images/riffin_logo.png";
import mobileLogo from "../../../../assets/images/riffin_mobile_logo.png";

const HeaderLogo = () => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      { onlySmallScreen ?
          <img src={mobileLogo} alt="logo" style={{width: "45px"}}/>
        :
          <Box sx={{display: "flex"}}>
            <img src={logo} alt="logo" style={{width: "45px"}}/>
            <h1 style={theme.typography.logo}>Riffin</h1>
          </Box>
      }
    </>
  );
};

export default HeaderLogo;
