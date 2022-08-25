import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

// Components
import { CognitoUserContext } from 'containers/CognitoContextProvider/CognitoContextProvider';
import Home from "pages/Home/Home";

function App() {
 console.log('')
  return (
      <ThemeProvider theme={theme}>
        <CognitoUserContext>
          <Home />
        </CognitoUserContext>
      </ThemeProvider>
  );
}

export default App;
