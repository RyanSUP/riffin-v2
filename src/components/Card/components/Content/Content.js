// Components and hooks
import Bar from "components/Bar/Bar";

// MUI
import { Box, Typography } from "@mui/material";

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
              <div key={i}>
                <Typography>{bar.label}</Typography>
                <Bar barData={bar} readOnly={true} />
              </div>
            ))}
          </div>
        ) : ( <Bar barData={props.bars[0]} readOnly={true} /> )
      }
    </Box>
  );
};

export default Content;
