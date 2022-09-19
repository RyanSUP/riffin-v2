import TablatureGrill from "./TablatureGrill";
import renderer from 'react-test-renderer';

test('renders', ()=> {
  const tree = renderer
    .create(<TablatureGrill />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});