const inputsStyle = {
  background: "transparent",
  margin: 0,
  position: "relative",
  resize: "none",
  textAlign: "center",
  zIndex: 2,
};

const dashesStyle = {
  margin: 0,
  position: "absolute",
  resize: "none",
  textAlign: "center",
  left: 0,
  zIndex: 1,
};

const scrollWrapper = {
  overflowY: "scroll",
};

const Content = (props) => {
  return (
    <>
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
    </>
  );
};

export default Content;