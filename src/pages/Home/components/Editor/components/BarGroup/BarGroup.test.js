import { render, screen } from "@testing-library/react";
import BarGroup from './BarGroup'
import { BrowserRouter } from 'react-router-dom'

test('delete button does not show when there is only one bar', () => {
  render(<BarGroup bars={[{_id: 1}]} />)
  expect(screen.queryByLabelText('Delete bar')).not.toBeInTheDocument()
})

test('delete button shows when there is more than one bar', () => {
  render(<BarGroup bars={[{_id: 1}, {_id: 2}]} />)
  const deleteBtnCount = screen.queryAllByLabelText('Delete bar').length
  expect(deleteBtnCount).toBe(2)
})