import { Grid } from "@mui/material";
import ExpandableCardContainer from "containers/ExpandableCardContainer/ExpandableCardContainer";
import { useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
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