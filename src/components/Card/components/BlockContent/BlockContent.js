import { Box, Typography } from "@mui/material";
import ReadonlyTablature from "components/ReadonlyTablature/ReadonlyTablature";

const spacerStyle = {
  my: 1
}

const BlockContent = (props) => {
  return (
    <>
      {props.blocks?.map((block, i) => (
        <Box key={i}>
          <Box sx={spacerStyle}>
            <Typography>{block.label}</Typography>
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
}
 
export default BlockContent;