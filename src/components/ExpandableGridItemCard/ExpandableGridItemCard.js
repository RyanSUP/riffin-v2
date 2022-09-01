// Components / hooks
import { useState } from "react";
import Card from "components/Card/Card";

// MUI
import { Grid } from "@mui/material";

const ExpandableGridItemCard = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Grid item lg={isExpanded ? 12 : 6} xs={12} >
      <Card
        handleExpand={handleExpand}
        tabData={props.tabData}
        isExpanded={isExpanded}
        user={props.user}
      />
    </Grid>
  );
}
 
export default ExpandableGridItemCard;