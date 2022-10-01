// Components / hooks
import TablatureBlock from "../TablatureBlock/TablatureBlock";
// MUI
import { Box } from "@mui/material";

const BlockGroup = (props) => {
  return (
    <>
      {props.tablature.blocks.map((block, i) => (
        <Box sx={{my: 4}} key={i}>
          <TablatureBlock key={i} index={i} block={block} numberOfStrings={props.tablature.numberOfStrings} />
        </Box>
      ))}
    </>
  );
}
 
export default BlockGroup;