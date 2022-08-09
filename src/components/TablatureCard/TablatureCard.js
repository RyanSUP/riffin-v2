// Components
import { Box } from "@mui/material";
import TablatureCardHeader from "./TabaltureCardHeader";
import TablatureCardBody from "./TablatureCardBody";
import TablatureCardFooter from "./TablatureCardFooter";

const cardStyles = {
    width: "400px"
}

const TablatureCard = (props) => {
    return (
        <Box style={cardStyles}>
            <TablatureCardHeader name={props.tablature.name} />
            <TablatureCardBody bars={props.tablature.bars} />
            <TablatureCardFooter preferredUsername={props.profile.preferredUsername} />
        </Box>
    );
}
 
export default TablatureCard;