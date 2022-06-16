import {
  render,
  screen,
  cleanup,
  waitForElement,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";
import renderer from "react-test-renderer";

// //makes sure each test is starting from the same starting point
afterEach(() => {
  cleanup();
});

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("navbar should be rendered", () => {
  render(<Navbar />);
  const navbar = screen.getByTestId("navbar");
  expect(navbar).toBeInTheDocument();
});

test("clicking Home should navigate to homepage", () => {
  render(<Navbar />);
  const buttonEl = screen.getByTestId("home");
  fireEvent.click(buttonEl);
  expect(mockedUsedNavigate).toHaveBeenCalledWith(`/`);
});

test("clicking Trending should navigate to Trending", () => {
  render(<Navbar />);
  const buttonEl = screen.getByTestId("trending");
  fireEvent.click(buttonEl);
  expect(mockedUsedNavigate).toHaveBeenCalledWith(`/trending`);
});

test("clicking Logo should navigate to Home", () => {
  render(<Navbar />);
  const buttonEl = screen.getByTestId("logo");
  fireEvent.click(buttonEl);
  expect(mockedUsedNavigate).toHaveBeenCalledWith(`/`);
});

test("matches snapshot", () => {
  const tree = renderer.create(<Navbar />).toJSON();
  expect(tree).toMatchSnapshot();
});
