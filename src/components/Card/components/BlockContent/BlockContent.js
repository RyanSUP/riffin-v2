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
  return (
    <>
      {props.blocks?.map((block, i) => (
        <Box key={i}>
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
      ))}
    </>
  );
};

export default BlockContent;
