import { Grid } from "@mui/material";
import { useState } from "react";
import Card from "components/Card/Card";
const ExpandableCardContainer = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded(!isExpanded);

  const gridItemStyles = {
    padding: "16px"
  }

  return (
    <Grid item lg={isExpanded ? 12 : 6} xs={12} style={gridItemStyles}>
      <Card
        handleExpand={handleExpand}
        tabData={props.tabData}
        isExpanded={isExpanded}
      />
    </Grid>
  );
}
 
export default ExpandableCardContainer;