import { getNewGuitarBlock } from "../../../../utils/EditorUtils";
import DashTextarea from "./DashTextarea";
import renderer from 'react-test-renderer';

// Note that style props may be undefined undefined because I'm not wrapping this in the theme context provider.
test('renders correctly using a new tablatureBlock', ()=> {
  const block = getNewGuitarBlock();
  const tree = renderer
    .create(<DashTextarea block={block}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});