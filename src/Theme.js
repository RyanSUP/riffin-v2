import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#4C566A",
      paper: "#282E37",
    },
    primary: {
      main: "#8FBCBB",
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#BF616A",
          fontWeight: 800,
        },
      },
    },
    Box: {
      styleOverrides: {
        root: {
          // background: "transparent",
        },
      },
    },
  },
  typography: {
    // Main Header
    h1: {
      fontFamily: "Inter",
      fontWeight: 800,
      fontSize: "64px",
      letterSpacing: "-1.5px",
      lineHeight: "100%",
    },
    // Tab Titles and Big Tags
    h2: {
      fontFamily: "Inter",
      fontWeight: 800,
      fontSize: "24px",
      letterSpacing: "-0.5px",
      lineHeight: "100%",
    },
    // Small Tags
    h3: {
      fontFamily: "Inter",
      fontWeight: 800,
      fontSize: "14px",
      fontStyle: "normal",
      lineHeight: "116.7%",
      letterSpacing: "0px",
      textAlign: "left",
    },
    h4: {
      fontFamily: "Inter",
      fontSize: "34px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "123.5%",
      letterSpacing: "0.25px",
      textAlign: "left",
    },
    body1: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "120%",
      letterSpacing: "0.15px",
      textAlign: "left",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "14px",
      },
    },
    body2: {
      fontFamily: "Inter",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "0.15px",
      lineHeight: "143%",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "12px",
      },
    },
    subtitle1: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "175%",
      letterSpacing: "0.15px",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "14px",
      },
    },
    subtitle2: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "157%",
      letterSpacing: "0.1px",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "13px",
      },
    },
    overline: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "266%",
      letterSpacing: "1px",
    },
    caption: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "10px",
      lineHeight: "166%",
      letterSpacing: "0.4px",
    },
    button: {
      fontFamily: "Inter",
      fontSize: "0.8125rem",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "12px",
      },
    },
  },
});

const lightTheme = createTheme({});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#307F5F",
      light: "#8EE59D",
      dark: "#20471B",
    },
    secondary: {
      main: "#004A8F",
      light: "#BCD4EF",
      dark: "#002746",
    },
    error: {
      main: "#EA0004",
      light: "#FF8670",
      dark: "#640006",
    },
    warning: {
      main: "#E16200",
      light: "#FFD58C",
      dark: "#842200",
    },
    info: {
      main: "#0097FB",
      light: "#B8E3FF",
      dark: "#004B6E",
    },
    success: {
      main: "#00B200",
      light: "#DDFFCB",
      dark: "#006B00",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    grid: {
      main: {
        active: "rgba(217, 239, 205, 0.7)",
        default: "#FFFFFF",
        header: "#2A333E",
      },
      nested: {
        active: "#8CAECF",
        default: "#EBF1F6",
        header: "#757B82",
        headerText: "#F5F5F5",
      },
    },
  },
  typography: {
    h1: {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: "96px",
      letterSpacing: "-1.5px",
      lineHeight: "100%",
    },
    h2: {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: "60px",
      letterSpacing: "-0.5px",
      lineHeight: "100%",
    },
    h3: {
      fontFamily: "Inter",
      fontSize: "48px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "116.7%",
      letterSpacing: "0px",
      textAlign: "left",
    },
    h4: {
      fontFamily: "Inter",
      fontSize: "34px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "123.5%",
      letterSpacing: "0.25px",
      textAlign: "left",
    },
    h5: {
      fontFamily: "Inter",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "133.4%",
      letterSpacing: "0px",
      textAlign: "left",
    },
    h6: {
      fontFamily: "Inter",
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "160%",
      letterSpacing: "0.15px",
    },
    body1: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "120%",
      letterSpacing: "0.15px",
      textAlign: "left",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "14px",
      },
    },
    body2: {
      fontFamily: "Inter",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "0.15px",
      lineHeight: "143%",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "12px",
      },
    },
    subtitle1: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "175%",
      letterSpacing: "0.15px",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "14px",
      },
    },
    subtitle2: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "157%",
      letterSpacing: "0.1px",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "13px",
      },
    },
    overline: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "266%",
      letterSpacing: "1px",
    },
    caption: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "10px",
      lineHeight: "166%",
      letterSpacing: "0.4px",
    },
    button: {
      fontFamily: "Inter",
      fontSize: "0.8125rem",
      [`@media screen and (max-width: 1200px)`]: {
        fontSize: "12px",
      },
    },
  },
  transitions: {},
  zIndex: {},
  components: {},
});

export { darkTheme, lightTheme, theme };
