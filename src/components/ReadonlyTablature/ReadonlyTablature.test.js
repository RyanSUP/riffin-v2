import { render, screen } from "@testing-library/react"
import ReadonlyTablature from './ReadonlyTablature'
import { sampleTablatureBlock } from "utils/TestUtils/TestUtils" 

test('renders both "inputs" and "dashes" text areas', () => {
  render(<ReadonlyTablature blockData={sampleTablatureBlock} />)
  expect(screen.getByText(sampleTablatureBlock.inputs)).toBeInTheDocument()
  expect(screen.getByText(sampleTablatureBlock.dashes)).toBeInTheDocument()
})