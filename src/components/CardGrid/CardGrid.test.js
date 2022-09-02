import { screen } from '@testing-library/react'
import CardGrid from './CardGrid'
import { renderWithUserContext } from 'utils/TestUtils/TestUtils'
import { testTab } from 'utils/TestUtils/TestTabObject'

test('renders cards', ()=> {
  const tablature = [testTab, testTab]
  renderWithUserContext(<CardGrid tablature={tablature} />)
  expect(screen.queryAllByText('test tab').length).toBe(2)
})