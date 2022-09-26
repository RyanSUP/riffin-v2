import React from "react";
import { useTheme } from "@mui/material/styles";

const HeaderLogo = () => {
  const theme = useTheme();
  return <h1 style={theme.typography.logo}>Riffin</h1>;
};

export default HeaderLogo;
