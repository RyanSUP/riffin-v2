// Components
import { Avatar, Grid, Button } from "@mui/material";

const MetaData = (props) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        Tags will show here
      </Grid>
      <Grid item xs={3}>
        <Button size="small" variant="text" onClick={props.navigateToProfile}>
          by {props.preferredUsername}
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Avatar />
      </Grid>
    </Grid>
  );
};

export default MetaData;
