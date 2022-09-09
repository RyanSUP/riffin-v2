// Services
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./Theme";
import { CssBaseline } from "@mui/material";
// import { useState } from "react";
// import Button from "@mui/material/Button";

import { CognitoUserProvider } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureProvider } from "containers/TablatureProvider/TablatureProvider"
import Home from "pages/Home/Home";

function App() {
  // const [light, setLight] = useState(true);
  // TODO add Toggle Button for dark/light themes

  return (
    <ThemeProvider theme={darkTheme}>
      <CognitoUserProvider>
        <CssBaseline />
        {/* <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button> */}
        <TablatureProvider>
          <Home />
        </TablatureProvider>
      </CognitoUserProvider>
    </ThemeProvider>
  );
}

export default App;
