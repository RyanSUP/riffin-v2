import renderer from 'react-test-renderer';
import Sidebar from './Sidebar'
import { BrowserRouter } from 'react-router-dom'
test('renders correctly', ()=> {
  const component = (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  )
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
