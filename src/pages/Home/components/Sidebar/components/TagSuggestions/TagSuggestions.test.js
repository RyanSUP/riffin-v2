import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagSuggestions from './TagSuggestions';

const mockAddTag = jest.fn(tag => tag)

test('renders correctly', () => {
  const tree = renderer
  .create(<TagSuggestions />)
  .toJSON();
  expect(tree).toMatchSnapshot();
})
