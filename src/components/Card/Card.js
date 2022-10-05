// Components and hooks
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import TagGroup from "./components/TagGroup/TagGroup";

//MUI
import { Box } from "@mui/system";
import { Divider } from "@mui/material";

const Card = (props) => {

  const contentBoxStyles = {
    display: "flex",
    justifyContent: "center"
  }

  const cardStyles = {
    padding: "15px",
  };

  return (
    <Box style={cardStyles}>
      <Divider textAlign="left">
        <Header
          tabData={props.tabData}
          isExpanded={props.isExpanded}
          handleExpand={props.handleExpand}
        />
      </Divider>
      <TagGroup tags={props.tabData.tags} />
      <Box style={contentBoxStyles}>
        <Content tablatureBlocks={props.tabData.blocks} isExpanded={props.isExpanded} numberOfStrings={props.tabData.numberOfStrings}/>
      </Box>
    </Box>
  );
};

export default Card;
