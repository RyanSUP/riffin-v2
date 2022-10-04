import renderer from 'react-test-renderer';
import TagSuggestions from './TagSuggestions';

test('renders correctly', () => {
  const tree = renderer
  .create(<TagSuggestions />)
  .toJSON();
  expect(tree).toMatchSnapshot();
})
