import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();
  const belowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()
  const handleClick = () => navigate("/")
  return (
    <>
      { belowMediumScreen ?
          <Typography style={theme.typography.logo}>🤘</Typography>
        :
          <Box sx={{display: "flex", cursor: 'pointer'}} onClick={handleClick}>
            <Typography sx={{alignSelf: 'center'}} style={theme.typography.logo}>🤘Riffin</Typography>
          </Box>
      }
    </>
  );
};

export default Logo;
