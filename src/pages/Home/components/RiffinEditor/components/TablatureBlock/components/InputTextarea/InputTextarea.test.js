import { getNewGuitarBlock } from "pages/Home/components/RiffinEditor/Utilities";
import InputTextarea from "./InputTextarea";
import renderer from 'react-test-renderer';
// Note that style props may be undefined undefined because I'm not wrapping this in the theme context provider.

test('renders correctly using a new tablatureBlock', ()=> {
  const block = getNewGuitarBlock();
  const tree = renderer
    .create(<InputTextarea 
      block={block}
      index={0}
      numberOfStrings={6}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Research how to mockup reducers.
test.todo('write unit tests for user interactions with the textarea')