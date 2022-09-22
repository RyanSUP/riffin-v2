// Components / hooks
import ExpandableGridItemCard from "components/ExpandableGridItemCard/ExpandableGridItemCard";

// MUI
import { Grid } from "@mui/material";

const CardGrid = (props) => {
  return (
    <Grid container spacing={2}>
      {props.tablature.map((tab, index) => (
        <ExpandableGridItemCard tabData={tab} key={index} />
      ))}
    </Grid>
  );
};

export default CardGrid;
