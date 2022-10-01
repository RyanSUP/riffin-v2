import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import BlockHeader from "./components/BlockHeader/BlockHeader";
import { useState } from "react";

// TODO This has same name as anotehr component. One needs to change
const TablatureBlock = (props) => {
  const [showOptions, setShowOptions] = useState(false)

  const handleMouseEnter = () => {
    setShowOptions(true);
  }
  const handleMouseLeave = () => {
    setShowOptions(false);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <BlockHeader block={props.block} index={props.index} showOptions={showOptions}/>
      <div style={{ position: "relative", left: "-5px"}}>
        <InputTextarea block={props.block} index={props.index} numberOfStrings={props.numberOfStrings}/>
        <DashTextarea block={props.block} numberOfStrings={props.numberOfStrings}/>
      </div>
    </div>
  );
}
 
export default TablatureBlock;
