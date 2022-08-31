import { Grid } from "@mui/material";
import ExpandableCardContainer from "containers/ExpandableCardContainer/ExpandableCardContainer";

const CardGrid = (props) => {

  return (
    <Grid container spacing={2}>
      {props.tablature.map((tab, index) => (
        <ExpandableCardContainer 
          tabData={tab}
          key={index}
        />
      ))}
    </Grid>
  );
}
 
export default CardGrid;