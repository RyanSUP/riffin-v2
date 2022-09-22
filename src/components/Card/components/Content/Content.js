// Components and hooks
import TablatureBlock from "components/TablatureBlock/TablatureBlock";

// MUI
import { Box, Typography } from "@mui/material";

const boxStyles = {
  margin: "10px 0",
  width: "100%",
  textAlign: "center",
}

const Content = (props) => {
  return (
    <Box style={boxStyles}>
      {props.isExpanded ? 
        (
          <>
            {props.tablatureBlocks.map((block, i) => (
              <div key={i}>
                <Typography>{block.label}</Typography>
                <TablatureBlock 
                  numberOfStrings={props.numberOfStrings} 
                  blockData={block} 
                />
              </div>
            ))}
          </>
        ) : (<TablatureBlock 
              blockData={props.tablatureBlocks[0]} 
              numberOfStrings={props.numberOfStrings}
            />)
      }
    </Box>
  );
};

export default Content;
