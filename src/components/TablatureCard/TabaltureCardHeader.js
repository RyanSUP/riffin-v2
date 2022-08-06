import { Button, Typography, Grid } from "@mui/material";

const TablatureCardHeader = (props) => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>{props.name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Button>Like</Button>
                <Button>Copy</Button>
                <Button>Expand</Button>
            </Grid>
        </Grid>
    );
}
 
export default TablatureCardHeader;