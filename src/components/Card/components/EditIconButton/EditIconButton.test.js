// import { render, screen } from '@testing-library/react'
// import userEvent from "@testing-library/user-event";
// import EditButtonIcon from './EditIconButton';

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

test.todo("clicking the edit button navigates to the edit component");
