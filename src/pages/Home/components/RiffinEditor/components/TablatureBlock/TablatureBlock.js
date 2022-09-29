import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";

// TODO This has same name as anotehr component. One needs to change
const TablatureBlock = (props) => {
  return (
    <div style={{ position: "relative"}}>
      <InputTextarea block={props.block} index={props.index}/>
      <DashTextarea block={props.block} />
    </div>
  );
}
 
export default TablatureBlock;