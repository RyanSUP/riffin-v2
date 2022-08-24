import { Box, Typography } from "@mui/material";
import Bar from "../Bar/Bar";

const scrollWrapper = {
  overflowY: "scroll",
};

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
          <div style={scrollWrapper}>
            {props.bars.map((bar, i) => (
              <>
                <Typography>{bar.label}</Typography>
                <Bar barData={bar} readOnly={true} />
              </>
            ))}
          </div>
        ) : ( <Bar barData={props.bars[0]} readOnly={true} /> )
      }
    </Box>
  );
};

export default Content;
