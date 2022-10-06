// The card should be clickable when there is more than 1 bar and the isExpanded state is false
// When the user hovers over a clickable card, the expand button should highlight
// There should be no expand button if a card only has 1 bar and the label is empty

import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";

import EditTablatureButton from "./components/EditTablatureButton/EditTablatureButton";
import TagGroup from "./components/TagGroup/TagGroup";
import TablatureBlock from "components/ReadonlyTablature/ReadonlyTablature";
import DividerWrapper from "./components/DividerWrapper/DividerWrapper";
import DividerText from "./components/DividerText/DividerText";
import ExpandButton from "./components/ExpandButton/ExpandButton";
import ButtonWrapper from "./components/ButtonWrapper/ButtonWrapper";
import ReadonlyTablature from "components/ReadonlyTablature/ReadonlyTablature";
import BlockContent from "./components/BlockContent/BlockContent";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  /**
   * Toggles expanded state, which determines the content view of the card.
   */
  const toggleExpand = () => setExpanded((prev) => !prev);

  /**
   * Cards that have no additional content should not be expandable
   */
  const disableExpand = (props.tabData.blocks.length < 2 || props.tabData.blocks[0].label === "")

  return (
    <>
      <DividerWrapper>
        <DividerText>{props.tabData.name}</DividerText>
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
    </>
  );
}
 
export default Card;