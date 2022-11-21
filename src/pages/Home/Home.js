// Components
import Logo from './components/Logo/Logo';
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import TagBar from './components/TagBar/TagBar';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import DemoContent from "./components/ProfileContent/DemoContent";
import LoginSignupForm from "./components/LoginSignupForm/LoginSignupForm";
import { RiffinProvider } from './components/RiffinEditor/RiffinProvider';
import RiffinEditor from './components/RiffinEditor/RiffinEditor';
import RiffinDrawer from './components/RiffinEditor/components/RiffinDrawer/RiffinDrawer';
import CollectionButton from './components/Sidebar/components/CollectionButton/CollectionButton';
import CreateGuitarTabButton from './components/Sidebar/components/CreateGuitarTabButton/CreateGuitarTabButton';
import CreateBassTabButton from './components/Sidebar/components/CreateBassTabButton/CreateBassTabButton';
import ContentLayout from 'containers/ContentLayout/ContentLayout';
import { UserContext } from 'containers/CognitoUserProvider/CognitoUserProvider';
import { useContext } from 'react';
// MUI
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { Box } from "@mui/material";
import ChangePasswordForm from './components/LoginSignupForm/components/ChangePasswordForm.js/ChangePasswordForm';
import Donate from './components/Donate/Donate';
import DonateMobile from './components/Donate/DonateMobile';
import PageNotFound from 'pages/PageNotFound/PageNotFound';

const header = {
  width: "100%",
  margin: "0 auto",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "5",
  padding: "10px 0",
  background: "#0f1627",
};

const wrap = {
  maxWidth: "1700px",
  margin: "0 auto",
  position: "relative",
};

const flex = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const containerDefaults = {
  padding: "0 20px",
  boxSizing: "border-box",
};


const filterContainer = {
  width: "100%",
  overflowX: "clip",
};

const sidebarStyle = {
  height: "calc(100vh - 90px)",
  position: "sticky",
  top: '80px',
};

const Home = () => {
  const location = useLocation()
  const theme = useTheme();
  const { user } = useContext(UserContext)
  const left = {
    minWidth: "200px",
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  };

  const right = {
    minWidth: "260px",
    maxWidth: "260px",
    justifyContent: "flex-end",
    [theme.breakpoints.down('md')]: {
      maxWidth: "100%",
    }
  };

  const logo = {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      minWidth: '55px',
      padding: "0",
      paddingLeft: '10px'
    }
  }

  const middle = {
    width: "100%",
    overflowX: "clip",
  };
  

  const main = {
    alignItems: "flex-start",
    flexDirection: "row",
    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
    }
  };

  const headerLinksStyle = {
    [theme.breakpoints.down('md')]: {
      minWidth: 0,
      paddingLeft: 0,
    }
  };
  return (
    <Box sx={{paddingTop: '80px'}}>
      {/* Header */}
      <Box sx={header}>
        <Box sx={{...wrap, ...flex}}>
          {/* left */}
          <Box sx={{...left, ...containerDefaults, ...logo}}>
            <Logo />
          </Box>
          
          {/* Center */}
          <Box sx={{...middle, ...containerDefaults, ...filterContainer}}>
            {user || (!user && (location.pathname === '/demo' || location.pathname === '/edit/demo'))
            ? 
              <TagBar />
            : 
              <Box sx={{height: '56px', display: 'flex', alignItems: 'center'}}>
                <Divider textAlign='left' sx={{width: '100%'}}>
                  <Typography variant="h2">A tablature sketchpad</Typography>
                </Divider>
              </Box>
            }
          </Box>

          {/* right */}
          <Box sx={{...right, ...containerDefaults, ...headerLinksStyle}}>
            <HeaderLinks />
          </Box>
        </Box>
      </Box>

      {/* Main */}
      <Box sx={{...wrap, ...flex, ...main}}>
        {/* Left */}
        <Box sx={{...left, ...containerDefaults, ...sidebarStyle}}>
          <Stack direction="column" sx={{mb: 2}}>
            <CollectionButton />
            <CreateGuitarTabButton />
            <CreateBassTabButton />
          </Stack>
          <Donate />
        </Box>
        <Routes>
          {/* // TODO Refactor this to /auth => /auth/login => /auth/signup */}
          <Route path="/" element={<Navigate to={`/demo`} />} />
          <Route path="/login" element={
            <ContentLayout>
              <LoginSignupForm />
              <></>
            </ContentLayout>
          }/>
          <Route path="/changePassword" element={
            <ContentLayout>
              <ChangePasswordForm />
              <></>
            </ContentLayout>
          }/>
          {/* // TODO Refactor this route to be /profile */}
          <Route path="/profile/:cognitoUsername" element={
            <ContentLayout>
              <ProfileContent />
              <></>
            </ContentLayout>
          }/>
          <Route path="/new/guitar" element={
            <RiffinProvider key="newGuitar" numberOfStrings={6}>
              <ContentLayout>
                <RiffinEditor />
                <RiffinDrawer />
              </ContentLayout>
            </RiffinProvider>
          }/>
          <Route path="/new/bass" element={
            <RiffinProvider key="newBass" numberOfStrings={4}>
              <ContentLayout>
                <RiffinEditor />
                <RiffinDrawer />
              </ContentLayout>
            </RiffinProvider>
          }/>
          <Route path="/edit/:tabId" element={
            <RiffinProvider key="editor">
              <ContentLayout>
                <RiffinEditor />
                <RiffinDrawer />
              </ContentLayout>
            </RiffinProvider>
          }/>
          <Route path="/demo" element={
            <ContentLayout>
              <DemoContent />
              <></>
            </ContentLayout>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <DonateMobile />
      </Box>
    </Box>
  );
}
 
export default Home;