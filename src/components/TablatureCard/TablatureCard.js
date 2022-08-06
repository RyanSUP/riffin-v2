import { Box, Container } from "@mui/material";
import TablatureCardHeader from "./TabaltureCardHeader";
import TablatureCardBody from "./TablatureCardBody";
import TablatureCardFooter from "./TablatureCardFooter";

// Takes in a varient property - trending or selfProfile. Displays parts based on varient
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