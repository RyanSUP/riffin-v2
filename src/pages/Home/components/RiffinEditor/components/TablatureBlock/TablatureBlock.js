import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";

// TODO This has same name as anotehr component. One needs to change
const TablatureBlock = (props) => {
  return (
    <>
      <BlockOptionsMenu block={props.block} index={props.index} />
      <div style={{ position: "relative"}}>
        <InputTextarea block={props.block} index={props.index}/>
        <DashTextarea block={props.block} />
      </div>
    </>
  );
}
 
export default TablatureBlock;
