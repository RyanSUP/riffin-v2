// Components
import Sidebar from './components/Sidebar/Sidebar';
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import TagBar from './components/TagBar/TagBar';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import LoginSignupForm from "./components/LoginSignupForm/LoginSignupForm";
import { RiffinProvider } from './components/RiffinEditor/RiffinProvider';

// MUI
import { Grid, Container } from "@mui/material";
import RiffinEditor from './components/RiffinEditor/RiffinEditor';
import RiffinDrawer from './components/RiffinEditor/components/RiffinDrawer/RiffinDrawer';

/**
 * * Home handles the application layout and routing.
 */

const Home = () => {
  const theme = useTheme();
  const belowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div data-testid="Home">
      <Grid container>

        <Grid item xs={12}>
          <Grid container sx={{alignItems: "center", my: "16px"}}>

            <Grid item xs={2}>
              <Container>
                <HeaderLogo />
              </Container>
            </Grid>

            <Grid item xs={8}>
              <TagBar />
            </Grid>

            <Grid item xs={2}>
              <Container>
                <HeaderLinks />
              </Container>
            </Grid>
            
          </Grid> 
        </Grid>
        
        {!belowMediumScreen &&
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
        }

        <Routes>
          <Route path="/login" element={
            <Grid item xs={8}>
              <LoginSignupForm />
            </Grid>
          }/>
          <Route path="/profile/:cognitoUsername" element={
            <Grid item xs={8}>
              <ProfileContent />
            </Grid>
          }/>
          <Route path="/new/guitar" element={
            <RiffinProvider key={"newGuitar"} numberOfStrings={6}>
              <Grid item xs={8}>
                <RiffinEditor />
              </Grid>
              <Grid item xs={2}>
                <RiffinDrawer />
              </Grid>
            </RiffinProvider>
          }/>
          <Route path="/new/bass" element={
            <Grid item xs={8}>
              <RiffinProvider key={"bass"} numberOfStrings={4}  />
            </Grid>
          }/>
          <Route path="/edit/:tabId" element={
            <Grid item xs={8}>
              <RiffinProvider key={"editor"} />
            </Grid>
          }/>
          <Route path="*" element={<Navigate to="/new/guitar" replace />} />
        </Routes>

      </Grid>
    </div>
  );
}
 
export default Home;