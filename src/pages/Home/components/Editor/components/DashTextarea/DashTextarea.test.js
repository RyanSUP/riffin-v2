import { getNewGuitarBlock } from "../../utils/EditorUtils";
import DashTextarea from "./DashTextarea";
import renderer from 'react-test-renderer';

test('renders correctly using a new tablatureBlock', ()=> {
  const block = getNewGuitarBlock();
  const tree = renderer
    .create(<DashTextarea block={block}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});