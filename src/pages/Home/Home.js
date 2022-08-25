// Components
import Nav from "./components/Nav/Nav";
import OfficialNavPlus from './components/OfficialNavPlus/OfficialNavPlus';
import ContentRoutes from "./components/ContentRoutes/ContentRoutes";

// MUI
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <div data-testid="Home">
      <Nav />
      <Grid container>
        <Grid item xs={12}>
          header
        </Grid>
        <Grid item xs={2}>                
          <OfficialNavPlus />
        </Grid>
        <Grid item xs={8}>
          <ContentRoutes />
        </Grid>
        <Grid item xs={2}>
          Ad
        </Grid>
      </Grid>
    </div>
  );
}
 
export default Home;