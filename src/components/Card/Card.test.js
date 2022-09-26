import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { testTab } from "utils/TestUtils/TestTabObject";
import Card from './Card';

test('isExpanded false shows only the first bar', async ()=> {
  render(<Card 
    tabData={testTab} 
    user={{username: 'JarJar_Binks'}} 
    handleExpand={() => null}
    isExpanded={false}
  />, {wrapper: BrowserRouter})

  expect(screen.getByText('test inputs A')).toBeInTheDocument()
  expect(screen.queryByText('test inputs B')).not.toBeInTheDocument()
})

test('isExpanded true shows additional bars', async ()=> {
  render(<Card 
    tabData={testTab} 
    user={{username: 'JarJar_Binks'}} 
    handleExpand={() => null}
    isExpanded={true}
  />, {wrapper: BrowserRouter})
  expect(screen.getByText('test inputs A')).toBeInTheDocument()
  expect(screen.getByText('test inputs B')).toBeInTheDocument()
})
