import { Container } from "@mui/material";
const barContainer = {
    position: 'relative'
}

const inputsStyle = {
    background: "transparent",
    margin: 0,
    position: "relative",
    resize: "none",
    textAlign: "center",
}

const dashesStyle = {
    margin: 0,
    position: "absolute",
    resize: "none",
    textAlign: "center",
    left: 0,
    zIndex: -1,
}

const scrollWrapper = {
    overflowY: "scroll"
}

const TablatureCardBody = (props) => {
    return (
        <div style={ scrollWrapper }>
            {props.bars.map( (bar, i) => (
                <div key={i}>
                    <textarea 
                        value={bar.inputs} 
                        readOnly={true}
                        style={ inputsStyle }
                        cols="40" 
                        rows="6" 
                        maxLength="251" 
                    />
                    <textarea 
                        value={bar.dashes} 
                        readOnly={true}
                        style={ dashesStyle }
                        cols="40" 
                        rows="6" 
                        maxLength="251" 
                    />
                </div>
            ))}
        </div>
    );
}
 
export default TablatureCardBody;