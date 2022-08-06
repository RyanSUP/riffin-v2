const TablatureCard = (props) => {
    return (
        <>
            <p>{props.tablature.name}</p>
            {props.tablature.bars.map( (bar, i) => (
                <div key={i}>
                    <textarea 
                        value={bar.inputs} 
                        readOnly={true}
                        style={ {resize: "none"} }
                        cols="40" 
                        rows="6" 
                        maxLength="251" 
                    />
                    <textarea 
                        value={bar.dashes} 
                        readOnly={true}
                        style={ {resize: "none"} }
                        cols="40" 
                        rows="6" 
                        maxLength="251" 
                    />
                </div>
            ))

            }
        </>
    );
}
 
export default TablatureCard;