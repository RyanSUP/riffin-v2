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
import { Grid } from "@mui/material";
import RiffinEditor from './components/RiffinEditor/RiffinEditor';
import RiffinDrawer from './components/RiffinEditor/components/RiffinDrawer/RiffinDrawer';
import GutterContainer from 'containers/GutterContainer/GutterContainer';

/**
 * * Home handles the application layout and routing.
 */

const Home = () => {
  const theme = useTheme();
  const belowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div data-testid="Home">
      <Grid container xs={{position: 'relative'}}>

        <Grid item xs={12} sx={{position: 'sticky', top: 0, backgroundColor: 'background.default', zIndex: '5'}}>
          <Grid container sx={{alignItems: "center", my: "16px"}}>

            <Grid item xs={2}>
              <GutterContainer justifyContent="end">
                <HeaderLogo />
              </GutterContainer>
            </Grid>

            <Grid item xs={8}>
              <TagBar />
            </Grid>

            <Grid item xs={2}>
              <HeaderLinks />
            </Grid>
            
          </Grid> 
        </Grid>
        
        {!belowMediumScreen &&
          <Grid item xs={2} sx={{height: 'fit-content', position: 'sticky', top: '90px'}}>
            <GutterContainer justifyContent="end">
              <Sidebar />
            </GutterContainer>
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
              <Grid item xs={2} sx={{height: 'fit-content', position: 'sticky', top: '90px'}}>
                <RiffinDrawer />
              </Grid>
            </RiffinProvider>
          }/>
          <Route path="/new/bass" element={
            <RiffinProvider key={"bass"} numberOfStrings={4}>
              <Grid item xs={8}>
                <RiffinEditor />
              </Grid>
              <Grid item xs={2} sx={{height: '85vh', position: 'sticky', top: '90px'}}>
                <RiffinDrawer />
              </Grid>
            </RiffinProvider>
          }/>
          <Route path="/edit/:tabId" element={
            <RiffinProvider key={"editor"}>
              <Grid item xs={8}>
                <RiffinEditor />
              </Grid>
              <Grid item xs={2} sx={{height: '85vh', position: 'sticky', top: '90px'}}>
                <RiffinDrawer />
              </Grid>
            </RiffinProvider>
          }/>
          <Route path="*" element={<Navigate to="/new/guitar" replace />} />
        </Routes>

      </Grid>
    </div>
  );
}
 
export default Home;