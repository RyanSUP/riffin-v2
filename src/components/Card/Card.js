// Components
import { Grid, Paper, Container } from "@mui/material";
import Header from "./Header";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import Content from "./Content";
import MetaData from "./MetaData";
import { useNavigate } from "react-router-dom";

// props: tabData, authorData
const Card = (props) => {
  const [isExpanded, setIsExpanded] = useState(
    props.isExpanded ? props.isExpanded : false
  );
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const cardStyles = {
    padding: "5px",
  };

  const handleExpand = () => setIsExpanded(!isExpanded);

  const navigateToProfile = () => {
    navigate(`/profile/${props.authorData.user}`);
  };

  return (
    <Grid item lg={isExpanded ? 10 : 5} xs={12}>
      <Paper style={cardStyles}>
        <Container>
          <Header
            tabName={props.tabData.name}
            ownedByUser={user.username === props.authorData.user}
            isExpanded={isExpanded}
            handleExpand={handleExpand}
          />
          {isExpanded && (
            <MetaData
              preferredUsername={props.authorData.preferredUsername}
              tags={props.tabData.tags}
              navigateToProfile={navigateToProfile}
            />
          )}
          <Content bars={props.tabData.bars} isExpanded={isExpanded} />
          {!isExpanded && (
            <MetaData
              preferredUsername={props.authorData.preferredUsername}
              tags={props.tabData.tags}
              navigateToProfile={navigateToProfile}
            />
          )}
        </Container>
      </Paper>
    </Grid>
  );
};

export default Card;
