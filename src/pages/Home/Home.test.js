import { render, screen } from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom'
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import userEvent from "@testing-library/user-event";
import React from 'react'
import Home from "./Home";

test('Home renders trending content area on initial load', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
})

test('Home renders the sanckbar nav menu', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('OfficialNavPlus')).toBeInTheDocument()
})

test.todo('Home rendes the Header component')

test.todo('Home renders the ad space')

test('Home redirects non users to the login page when clicking the Collection button', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
})

test('Home shows non users the trending content when clicking the Latest button', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText(/latest/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
})

test('Home shows non users the trending content when clicking the Trending button', async ()=> {
  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
})

const customRender = (ui, {providerProps}) => {
  return render(
    <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
    {wrapper: BrowserRouter},
  )
}

test('Home shows users profile content when clicking the Collections button', async ()=> {
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
})

test('Home content area swaps between showing trending and profile content based on button clicks and user status', async ()=> {
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

  // Test profile link
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('ProfileContent')).toBeInTheDocument()

  // Test trending link
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
})

test('Home content area swaps between showing trending and login content based on button clicks and non-user status', async ()=> {

  render(<Home />, {wrapper: BrowserRouter})
  const user = userEvent.setup()

  // Test profile link
  await user.click(screen.getByText(/collection/i))
  expect(screen.getByTestId('LoginForm')).toBeInTheDocument()

  // Test trending link
  await user.click(screen.getByText(/trending/i))
  expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
})