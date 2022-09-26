import { getNewGuitarBlock } from "../../../../utils/EditorUtils";
import InputTextarea from "./InputTextarea";
import renderer from 'react-test-renderer';
// Note that style props may be undefined undefined because I'm not wrapping this in the theme context provider.

test('renders correctly using a new tablatureBlock', ()=> {
  const block = getNewGuitarBlock();
  const handleBlockChange = jest.fn()
  const handleKeyUpInBlock = jest.fn()
  const handleClickedBlock = jest.fn()
  const index = 0
  const tree = renderer
    .create(<InputTextarea 
      block={block}
      handleBlockChange={handleBlockChange}
      handleKeyUpInBlock={handleKeyUpInBlock}
      handleClickedBlock={handleClickedBlock}
      index={index}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});