import { render, screen } from "@testing-library/react"
import Card from './Card'

const testTab = {
  tags: [],
  name: 'test tab name',
  bars: [
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
  ],
  owner: {
    user: 'testUser',
    preferredUsername: 'JarJar_Binks',
  }
}

test('isExpanded false shows only the first bar', async ()=> {
  render(<Card 
    tabData={testTab} 
    user={{username: 'JarJar_Binks'}} 
    handleExpand={() => null}
    isExpanded={false}
  />)

  expect(screen.getByText('test inputs A')).toBeInTheDocument()
  expect(screen.queryByText('test inputs B')).not.toBeInTheDocument()
})

test('isExpanded true shows additional bars', async ()=> {
  render(<Card 
    tabData={testTab} 
    user={{username: 'JarJar_Binks'}} 
    handleExpand={() => null}
    isExpanded={true}
  />)
  expect(screen.getByText('test inputs A')).toBeInTheDocument()
  expect(screen.getByText('test inputs B')).toBeInTheDocument()
})
