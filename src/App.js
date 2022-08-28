import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

// Components
import { CognitoUserProvider } from 'containers/CognitoUserProvider/CognitoUserProvider';
import Home from "pages/Home/Home";

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CognitoUserProvider>
          <Home />
        </CognitoUserProvider>
      </ThemeProvider>
  );
}

export default App;
