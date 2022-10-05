// Components
import Sidebar from './components/Sidebar/Sidebar';
import ContentRoutes from "./components/ContentRoutes/ContentRoutes";
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import TagBar from './components/TagBar/TagBar';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Images
import adImage from '../../assets/images/fake_ad.png'
// MUI
import { Grid, Box, Container } from "@mui/material";

/**
 * * Home primary focus is the layout of the application.
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

        <Grid item xs={12} md={10}>
          <ContentRoutes />
        </Grid>

      </Grid>
    </div>
  );
}
 
export default Home;