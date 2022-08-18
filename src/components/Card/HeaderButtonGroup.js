import { Button } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShareIcon from '@mui/icons-material/Share';

const HeaderButtonGroup = (props) => {
    return (
        <>
            <Button disabled={props.disableLike}>
                🤘
            </Button>
            <Button startIcon={<ShareIcon />} />
            <Button startIcon={
                <OpenInFullIcon 
                    onClick={props.handleExpand}
                />
            } />
        </>
    );
}
 
export default HeaderButtonGroup;