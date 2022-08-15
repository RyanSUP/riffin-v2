// Components
import { Avatar, Typography, Grid } from "@mui/material";

const TablatureCardFooter = (props) => {
    return (
        <Grid container >
            <Grid item xs={3}>
                <Typography>by {props.preferredUsername}</Typography>
            </Grid>
            <Grid item xs={9}>
                <Avatar />
            </Grid>
        </Grid>
    );
}
 
export default TablatureCardFooter;