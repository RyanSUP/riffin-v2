import { Box, Typography } from "@mui/material";
import ReadonlyTablature from "components/ReadonlyTablature/ReadonlyTablature";

const spacerStyle = {
  my: 1,
};

const notesStyle = {
  fontFamily: "monospace",
  fontSize: "16px",
  fontWeight: 400,
  whiteSpace: "pre-wrap"
};

const BlockContent = (props) => {

  const renderBlock = (block) => (
    <Box key={block.tempKey || block._id}>
      <Box sx={spacerStyle}>
        <Typography sx={notesStyle}>{block.label}</Typography>
      </Box>
      <Box sx={spacerStyle}>
        <ReadonlyTablature
          numberOfStrings={props.numberOfStrings}
          blockData={block}
        />
      </Box>
    </Box>
  )

  const renderAllBlocks = () => props.blocks?.map((block, i) => renderBlock(block, i))

  return (
    <>
      {props.expanded ? renderAllBlocks() : renderBlock(props.blocks[0])}
    </>
  );
};

export default BlockContent;
