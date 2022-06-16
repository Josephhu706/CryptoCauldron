import {
  render,
  screen,
  cleanup,
  waitForElement,
  getByTestId,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../pages/NotFound";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Not Found component should be rendered", () => {
  act(() => render(<NotFound />));
  const notFound = screen.getByTestId("notFound");
  expect(notFound).toBeInTheDocument();
});

test("clicking Home should navigate to homepage", () => {
  render(<NotFound />);
  const buttonEl = screen.getByTestId("backButton");
  fireEvent.click(buttonEl);
  expect(mockedUsedNavigate).toHaveBeenCalledWith(`/`);
});

test("404 Page matches snapshot", () => {
  const tree = renderer.create(<NotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
