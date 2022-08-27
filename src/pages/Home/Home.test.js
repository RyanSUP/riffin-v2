import { render, screen } from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom'
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import userEvent from "@testing-library/user-event";
import React from 'react'
import Home from "./Home";

test('Home renders trending content area on initial load', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
})

test('Home renders OfficialNavPlus on intial load', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('OfficialNavPlus')).toBeInTheDocument()
})

test.todo('Home rendes Header on initial load')

test.todo('Home renders ad space on initial load')

test('Home redirects non users to the login page when clicking the Collection button', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
  expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
})

test('Home shows non users the trending content when clicking the Latest button', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText(/latest/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
})

test('Home shows non users the trending content when clicking the Trending button', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
})

const customRender = (ui, {providerProps}) => {
  return render(
    <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
    {wrapper: BrowserRouter},
  )
}

test('Home shows users their profile content when clicking the Collections button', async ()=> {
  const providerProps = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        storage: {}
      }
    }
  }

  customRender(<Home />, {providerProps})

  const user = userEvent.setup()
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('ProfileContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()
})

test('Home shows users trending content when clicking the Trending button', async ()=> {
  const providerProps = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        storage: {}
      }
    }
  }

  customRender(<Home />, {providerProps})

  const user = userEvent.setup()
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
})

test('Home shows users trending content when clicking the Latest button', async ()=> {
  const providerProps = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        storage: {}
      }
    }
  }

  customRender(<Home />, {providerProps})

  const user = userEvent.setup()
  await user.click(screen.getByText(/latest/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
})


test('Content area properly swaps between ProfileContent, TrendingContent, and LoginForm for users who are logged in', async ()=> {
  const providerProps = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        storage: {}
      }
    }
  }

  customRender(<Home />, {providerProps})

  const user = userEvent.setup()

  // Initial load
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()

  // Test profile link
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('ProfileContent')).toBeInTheDocument()
  expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()


  // Test trending link
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()


  // Test profile link again to swap content are
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('ProfileContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()

  // Test trending link
  await user.click(screen.getByText(/latest/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  
})

test('Content area properly swaps between ProfileContent, TrendingContent, and LoginForm for users who are not logged in', async ()=> {

  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  
  // Initial load
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()

  // Test profile link
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
  expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()


  // Test trending link
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()


  // Test profile link
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
  expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()

  // Test trending link
  await user.click(screen.getByText(/latest/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
  expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
  expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
  
})