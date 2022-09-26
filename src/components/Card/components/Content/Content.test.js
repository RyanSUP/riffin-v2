import { render, screen } from '@testing-library/react'
import Content from './Content'
const testBlocks = [
  {
    label: 'test bar A',
    inputs: 'test inputs A',
    dashes: 'test dashes A',
  },
  {
    label: 'test bar B',
    inputs: 'test inputs B',
    dashes: 'test dashes B',
  }
]

test('card renders a single block when not expanded', ()=> {
  render(<Content tablatureBlocks={testBlocks} isExpanded={false} />)
  expect(screen.getByText('test inputs A')).toBeInTheDocument()
  expect(screen.queryByText('test dashes B')).not.toBeInTheDocument()
})

test('card renders all blocks when expanded and more than one bar exists', ()=>{
  render(<Content tablatureBlocks={testBlocks} isExpanded={true} />)
  expect(screen.getByText('test inputs A')).toBeInTheDocument()
  expect(screen.getByText('test inputs B')).toBeInTheDocument()
})
test('card renders bar labels when expanded', ()=> {
  render(<Content tablatureBlocks={testBlocks} isExpanded={true} />)
  expect(screen.getByText('test bar A')).toBeInTheDocument()
  expect(screen.getByText('test bar B')).toBeInTheDocument()
})