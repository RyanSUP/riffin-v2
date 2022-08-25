// Components and hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

//MUI
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";


// props: tabData, authorData
const Card = (props) => {
  const [isExpanded, setIsExpanded] = useState(
    props.isExpanded ? props.isExpanded : false
  );
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

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

  const handleEdit = () => navigate(`/edit/${props.tabData._id}`)

  const handleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Grid item lg={isExpanded ? 12 : 6} xs={12} style={gridItemStyles}>
      <Paper style={cardStyles}>
          <Header
            tabName={props.tabData.name}
            ownedByUser={user?.username === props.authorData.user}
            isExpanded={isExpanded}
            handleExpand={handleExpand}
            handleEdit={handleEdit}
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
