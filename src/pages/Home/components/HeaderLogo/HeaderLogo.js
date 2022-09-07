import React from "react";
import { useTheme } from "@mui/material/styles";

const HeaderLogo = () => {
  const theme = useTheme();

  const logoStyle = {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    padding: "30px",
    margin: "10px",
  };

  return <div style={logoStyle}>Riffin</div>;
};

export default HeaderLogo;
