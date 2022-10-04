/**
 * * This component glues the 2 main textareas, inputs and dashes, together and makes them appear as 1. This wrapper is its own component rather than a Box because of its importance to the overall functionality of the RiffinEditor.
 */
const TablatureWrapper = (props) => {

  const style= { 
    position: "relative", 
    left: "-4px" // This compensates for some inherent padding in the textareas and aligns the left side of the textarea with the start of the container.
  };

  return (
    <div style={style}>
      {props.children}
    </div>
  );
}
 
export default TablatureWrapper;