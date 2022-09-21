// Components and hooks
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

//MUI
import { Box } from "@mui/system";

const Card = (props) => {
  const { user } = useContext(UserContext);

  const contentBoxStyles = {
    display: "flex",
    justifyContent: "center"
  }

  const cardStyles = {
    padding: "15px",
  };

  return (
    <Box style={cardStyles} sx={{border: 4, borderColor: 'primary.main', borderRadius: '8px'}}>
      <Header
        tabData={props.tabData}
        isOwnedByUser={user?.username === props.tabData.owner.user}
        isExpanded={props.isExpanded}
        handleExpand={props.handleExpand}
      />
      <Box style={contentBoxStyles}>
        <Content tablatureBlocks={props.tabData.blocks} isExpanded={props.isExpanded} numberOfStrings={props.tabData.numberOfStrings}/>
      </Box>
      <Footer
        tags={props.tabData.tags}
      />
    </Box>
  );
};

export default Card;
