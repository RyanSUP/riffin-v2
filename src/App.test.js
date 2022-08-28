import { render, screen } from "@testing-library/react";
import React from 'react'

import  App from './App';
import {BrowserRouter} from 'react-router-dom'

test('App renders the Home component on initialization', ()=> {
  render(<App />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('Home')).toBeInTheDocument()
})

// test('App redirects non users to the login page when navigating to a /profile route', async ()=> {
//   render(<App />, {wrapper: BrowserRouter})
//   const user = userEvent.setup()
//   await user.click(screen.getByText(/collection/i))
//   expect(screen.getByTestId('loginForm')).toBeInTheDocument()
// })

// const customRender = (ui, {providerProps}) => {
//   return render(
//     <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
//     {wrapper: BrowserRouter},
//   )
// }

// test('App redirects users to a profile page when navigating to a /profile route', async ()=> {
//   const providerProps = {
//     value: {
//       user: {
//         username: 'JarJar_Binks'
//       }
//     }
//   }

//   customRender(<App />, {providerProps})

//   const user = userEvent.setup()
//   await user.click(screen.getByText(/collection/i))
//   expect(screen.getByTestId('loginForm')).toBeInTheDocument()
// })