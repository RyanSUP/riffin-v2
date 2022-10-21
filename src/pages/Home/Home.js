// Components
import Logo from './components/Logo/Logo';
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import TagBar from './components/TagBar/TagBar';
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import LoginSignupForm from "./components/LoginSignupForm/LoginSignupForm";
import { RiffinProvider } from './components/RiffinEditor/RiffinProvider';
// MUI
import { Button, Stack, useTheme } from '@mui/material';
import { Box } from "@mui/material";
import RiffinEditor from './components/RiffinEditor/RiffinEditor';
import RiffinDrawer from './components/RiffinEditor/components/RiffinDrawer/RiffinDrawer';
import Ad from 'components/Ad/Ad';
import CollectionButton from './components/Sidebar/components/CollectionButton/CollectionButton';
import CreateGuitarTabButton from './components/Sidebar/components/CreateGuitarTabButton/CreateGuitarTabButton';
import CreateBassTabButton from './components/Sidebar/components/CreateBassTabButton/CreateBassTabButton';

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

const middle = {
  width: "100%",
  overflowX: "clip",
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

const page = {
  width: "100%",
  boxSizing: "border-box",
};

const feed = {
  padding: "5px 20px 30px",
  display: "grid",
  marginTop: "5px",
};

const rightSidebarStyle = {
  height: "calc(100vh - 90px)",
  position: "sticky",
  top: '80px',
};

const right = {
  minWidth: "260px",
  maxWidth: "260px",
  justifyContent: "flex-end",
};

const Home = () => {

  const theme = useTheme();

  const left = {
    minWidth: "200px",
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  };

  const main = {
    alignItems: "flex-start",
    flexDirection: "row",
    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
    }
  };

  return (
    <>
    <Box sx={{paddingTop: '80px'}}>
      {/* Header */}
      <Box sx={header}>
        <Box sx={{...wrap, ...flex}}>
          {/* left */}
          <Box sx={{...left, ...containerDefaults}}>
            <Logo />
          </Box>
          
          {/* Middle filter container */}
          <Box sx={{...middle, ...containerDefaults, ...filterContainer}}>
            <TagBar />
          </Box>

          {/* right */}
          <Box sx={{...right, ...containerDefaults}}>
            <HeaderLinks />
          </Box>
        </Box>
      </Box>

      {/* Main */}
      <Box sx={{...wrap, ...flex, ...main}}>
        {/* Left */}
        <Box sx={{...left, ...containerDefaults, ...sidebarStyle}}>
          <Stack direction="column">
            <CollectionButton />
            <CreateGuitarTabButton />
            <CreateBassTabButton />
          </Stack>
          <Ad />
        </Box>

        <Routes>
          <Route path="/login" element={
            <>
            {/* Center */}
            <Box sx={page}>
              <Box sx={feed}>
                <LoginSignupForm />
              </Box>
            </Box>
            {/* Right */}
            <Box sx={{...right, ...rightSidebarStyle}}>

            </Box>
          </>
          }/>
          <Route path="/profile/:cognitoUsername" element={
            <>
              {/* Center */}
              <Box sx={page}>
                <Box sx={feed}>
                  <ProfileContent />
                </Box>
              </Box>
              {/* Right */}
              <Box sx={{...right, ...rightSidebarStyle}}>
                <Button variant="outlined" size="large">Donate</Button>
              </Box>
            </>
          }/>
          <Route path="/new/guitar" element={
            <RiffinProvider key="newGuitar" numberOfStrings={6}>
              <Box sx={page}>
                <Box sx={feed}>
                  <RiffinEditor />
                </Box>
              </Box>
              <Box sx={{...right, ...rightSidebarStyle}}>
                <RiffinDrawer />
              </Box>
            </RiffinProvider>
          }/>
          <Route path="/new/bass" element={
            <RiffinProvider key="newBass" numberOfStrings={4}>
            <Box sx={page}>
              <Box sx={feed}>
                <RiffinEditor />
              </Box>
            </Box>
            <Box sx={{...right, ...rightSidebarStyle}}>
              <RiffinDrawer />
            </Box>
          </RiffinProvider>
          }/>
          <Route path="/edit/:tabId" element={
            <RiffinProvider key="editor">
            <Box sx={page}>
              <Box sx={feed}>
                <RiffinEditor />
              </Box>
            </Box>
            <Box sx={{...right, ...rightSidebarStyle}}>
              <RiffinDrawer />
            </Box>
          </RiffinProvider>
          }/>
          <Route path="*" element={<Navigate to="/new/guitar" replace />} />
        </Routes>
      </Box>
    </Box>
    </>
  );
}
 
export default Home;