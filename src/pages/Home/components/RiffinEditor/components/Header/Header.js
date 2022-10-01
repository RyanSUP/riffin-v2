import TitleInput from "./components/TitleInput/TitleInput";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";
import DeleteTabButton from "./components/DeleteTabButton/DeleteTabButton";
import { Grid } from "@mui/material";
const Header = (props) => {

  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      <Grid item>
        <TitleInput />
      </Grid>
      <Grid item>
        <SaveTabButton 
          tablature={props.tablature} 
          setIsLoading={props.setIsLoading} 
          tags={props.tags}
        />
      </Grid>
      <Grid item>
        <DeleteTabButton tablature={props.tablature} />
      </Grid>
    </Grid>
  );
}
 
export default Header;
