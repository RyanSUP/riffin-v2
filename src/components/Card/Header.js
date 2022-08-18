import { Grid } from '@mui/material';
import HeaderButtonGroup from './HeaderButtonGroup';

const Header = (props) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <p>{props.tabName}</p>
            </Grid>
            <Grid item xs={8}>
                <HeaderButtonGroup 
                    disableLike={props.ownedByUser} 
                    handleExpand={props.handleExpand}
                />
            </Grid>
        </Grid>
    );
}
 
export default Header;