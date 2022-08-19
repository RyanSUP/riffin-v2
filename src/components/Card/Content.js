import { Box } from "@mui/material";

const inputsStyle = {
  background: "transparent",
  margin: 0,
  position: "relative",
  resize: "none",
  textAlign: "center",
  zIndex: 2,
  outline: "none",
  border: "none",
};

const dashesStyle = {
  margin: 0,
  position: "absolute",
  resize: "none",
  textAlign: "center",
  left: "50%",
  translate: "-50%",
  zIndex: 1,
  outline: "none",
  border: "none",
};

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
      {props.isExpanded ? (
        <div style={scrollWrapper}>
          {props.bars.map((bar, i) => (
            <div key={i} style={{ position: "relative" }}>
              <textarea
                value={bar.inputs}
                readOnly={true}
                style={inputsStyle}
                cols="40"
                rows="6"
                maxLength="251"
              />
              <textarea
                value={bar.dashes}
                readOnly={true}
                style={dashesStyle}
                cols="40"
                rows="6"
                maxLength="251"
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <textarea
              value={props.bars[0]?.inputs}
              readOnly={true}
              style={inputsStyle}
              cols="40"
              rows="6"
              maxLength="251"
            />
            <textarea
              value={props.bars[0]?.dashes}
              readOnly={true}
              style={dashesStyle}
              cols="40"
              rows="6"
              maxLength="251"
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default Content;
