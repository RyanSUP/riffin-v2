// Components / hooks
import { useState } from "react";
import EditTablatureButton from "./components/EditTablatureButton/EditTablatureButton";
import TagGroup from "./components/TagGroup/TagGroup";
import DividerWrapper from "./components/DividerWrapper/DividerWrapper";
import ExpandButton from "./components/ExpandButton/ExpandButton";
import ButtonWrapper from "./components/ButtonWrapper/ButtonWrapper";
import ReadonlyTablature from "components/ReadonlyTablature/ReadonlyTablature";
import BlockContent from "./components/BlockContent/BlockContent";
// MUI
import { Box, Typography } from "@mui/material";

const cardBottomMargin = {
  mb: 3
};

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  /**
   * Toggles expanded state, which determines the content view of the card.
   */
  const toggleExpand = () => setExpanded((prev) => !prev);

  /**
   * Cards that have no additional content should not be expandable
   */
  const onlyOneBlock = (props.tabData.blocks.length === 1);
  const firstBlockHasNoLabel = (props.tabData.blocks[0].label === undefined);
  const disableExpand = (onlyOneBlock && firstBlockHasNoLabel);

  return (
    <Box sx={cardBottomMargin}>
      <DividerWrapper>
        <Typography>{props.tabData.name}</Typography>
        <EditTablatureButton tab_id={props.tabData._id} />
        <ExpandButton 
          expanded={expanded} 
          disabled={disableExpand}
          onClick={toggleExpand}
        />
      </DividerWrapper>
      <ButtonWrapper onClick={toggleExpand} disabled={disableExpand}>
        <TagGroup tags={props.tabData.tags} />
        {expanded 
          ? 
            <BlockContent 
              blocks={props.tabData.blocks} 
              numberOfStrings={props.tabData.numberOfStrings}
            />
          : 
            <ReadonlyTablature 
              blockData={props.tabData.blocks[0]} 
              numberOfStrings={props.tabData.numberOfStrings}
            />
        }
      </ButtonWrapper>
    </Box>
  );
}
 
export default Card;