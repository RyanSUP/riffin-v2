// Components / hooks
import ExpandableCardContainer from "components/ExpandableGridItemCard/ExpandableGridItemCard";
import { useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// MUI
import { Grid } from "@mui/material";

const CardGrid = (props) => {
  const { user } = useContext(UserContext);

  return (
    <Grid container spacing={2}>
      {props.tablature.map((tab, index) => (
        <ExpandableCardContainer 
          tabData={tab}
          key={index}
          user={user}
        />
      ))}
    </Grid>
  );
}
 
export default CardGrid;