import { render, screen } from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom'

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