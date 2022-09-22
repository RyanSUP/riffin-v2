// import { render, screen } from "@testing-library/react";
// import {BrowserRouter} from 'react-router-dom'
// import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// import userEvent from "@testing-library/user-event";
// import React from 'react'
// import Home from "./Home";

test.todo("fix broken tests");

// Helper functions ----

// const testIfTrendingContentIsInTheDocument = () => {
//   expect(screen.getByTestId('TrendingContent')).toBeInTheDocument()
//   expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
//   expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
// }

// const testIfLoginFormIsInTheDocument = () => {
//   expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
//   expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()
//   expect(screen.queryByTestId('ProfileContent')).not.toBeInTheDocument()
// }

// const testIfProfileContentIsInTheDocument = () => {
//   expect(screen.getByTestId('ProfileContent')).toBeInTheDocument()
//   expect(screen.queryByTestId('TrendingContent')).not.toBeInTheDocument()
//   expect(screen.queryByTestId('LoginForm')).not.toBeInTheDocument()
// }

// const customRender = (ui, {providerProps}) => {
//   return render(
//     <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
//     {wrapper: BrowserRouter},
//   )
// }

// // Todo ----

// test.todo('Home rendes Header on initial load')
// test.todo('Home renders ad space on initial load')

// // Unit tests ----

// test('Home renders trending content area on initial load', async ()=> {
//   const providerProps = {
//     value: {
//       user: null
//     }
//   }
//   customRender(<Home />, {providerProps})
//   testIfTrendingContentIsInTheDocument()
// })

// test('Home renders OfficialNavPlus on intial load', async ()=> {
//   const providerProps = {
//     value: {
//       user: null
//     }
//   }
//   customRender(<Home />, {providerProps})
//   expect(screen.getByTestId('OfficialNavPlus')).toBeInTheDocument()
// })

// test('Home redirects non users to the login page when clicking the Collection button', async ()=> {
//   const providerProps = {
//     value: {
//       user: null
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()
//   await user.click(screen.getByText(/collection/i))
//   testIfLoginFormIsInTheDocument()
// })

// test('Home shows non users the trending content when clicking the Latest button', async ()=> {
//   const providerProps = {
//     value: {
//       user: null
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()
//   await user.click(screen.getByText(/latest/i))
//   testIfTrendingContentIsInTheDocument()
// })

// test('Home shows non users the trending content when clicking the Trending button', async ()=> {
//   const providerProps = {
//     value: {
//       user: null
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()
//   await user.click(screen.getByText(/trending/i))
//   testIfTrendingContentIsInTheDocument()
// })

// test('Home shows users their profile content when clicking the Collections button', async ()=> {
//   const providerProps = {
//     value: {
//       user: {
//         username: 'JarJar_Binks',
//         userDataKey: "pizza",
//         storage: {}
//       }
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()

//   await user.click(screen.getByText(/collection/i))
//   testIfProfileContentIsInTheDocument()
// })

// test('Home shows users trending content when clicking the Trending button', async ()=> {
//   const providerProps = {
//     value: {
//       user: {
//         username: 'JarJar_Binks',
//         userDataKey: "pizza",
//         storage: {}
//       }
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()

//   await user.click(screen.getByText(/trending/i))
//   testIfTrendingContentIsInTheDocument()
// })

// test('Home shows users trending content when clicking the Latest button', async ()=> {
//   const providerProps = {
//     value: {
//       user: {
//         username: 'JarJar_Binks',
//         userDataKey: "pizza",
//         storage: {}
//       }
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()

//   await user.click(screen.getByText(/latest/i))
//   testIfTrendingContentIsInTheDocument()
// })

// // Integration tests ----

// test('Content area properly swaps between ProfileContent, TrendingContent, and LoginForm for users who are logged in', async ()=> {
//   const providerProps = {
//     value: {
//       user: {
//         username: 'JarJar_Binks',
//         userDataKey: "pizza",
//         storage: {}
//       }
//     }
//   }
//   customRender(<Home />, {providerProps})
//   const user = userEvent.setup()

//   // Initial load
//   expect(screen.getByTestId('OfficialNavPlus')).toBeInTheDocument()
//   testIfTrendingContentIsInTheDocument()

//   // Test profile link
//   await user.click(screen.getByText(/collection/i))
//   testIfProfileContentIsInTheDocument()

//   // Test trending link
//   await user.click(screen.getByText(/trending/i))
//   testIfTrendingContentIsInTheDocument()

//   // Test profile link again to swap content are
//   await user.click(screen.getByText(/collection/i))
//   testIfProfileContentIsInTheDocument()

//   // Test trending link
//   await user.click(screen.getByText(/latest/i))
//   testIfTrendingContentIsInTheDocument()

// })

// test('Content area properly swaps between ProfileContent, TrendingContent, and LoginForm for users who are not logged in', async ()=> {

//   render(<Home />, {wrapper: BrowserRouter})
//   const user = userEvent.setup()

//   // Initial load
//   expect(screen.getByTestId('OfficialNavPlus')).toBeInTheDocument()
//   testIfTrendingContentIsInTheDocument()

//   // Test profile link
//   await user.click(screen.getByText(/collection/i))
//   testIfLoginFormIsInTheDocument()

//   // Test trending link
//   await user.click(screen.getByText(/trending/i))
//   testIfTrendingContentIsInTheDocument()

//   // Test profile link
//   await user.click(screen.getByText(/collection/i))
//   testIfLoginFormIsInTheDocument()

//   // Test trending link
//   await user.click(screen.getByText(/latest/i))
//   testIfTrendingContentIsInTheDocument()

// })
