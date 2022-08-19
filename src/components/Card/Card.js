// Components
import { Grid, Paper } from "@mui/material";
import Header from "./Header";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import { Box } from "@mui/system";

// props: tabData, authorData
const Card = (props) => {
  const [isExpanded, setIsExpanded] = useState(
    props.isExpanded ? props.isExpanded : false
  );
  const { user } = useContext(UserContext);

  const gridItemStyles = {
    padding: "16px"
  }

  const contentBoxStyles = {
    display: "flex",
    justifyContent: "center"
  }

  const cardStyles = {
    padding: "15px",
  };

  const handleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Grid item lg={isExpanded ? 12 : 6} xs={12} style={gridItemStyles}>
      <Paper style={cardStyles}>
          <Header
            tabName={props.tabData.name}
            ownedByUser={user.username === props.authorData.user}
            isExpanded={isExpanded}
            handleExpand={handleExpand}
          />
          <Box style={contentBoxStyles}>
            <Content bars={props.tabData.bars} isExpanded={isExpanded} />
          </Box>
          <Footer
            preferredUsername={props.authorData.preferredUsername}
            user={props.authorData.user}
            tags={props.tabData.tags}
          />
      </Paper>
    </Grid>
  );
};

export default Card;
