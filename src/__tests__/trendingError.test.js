import {
  render,
  screen,
  cleanup,
  waitForElement,
  getByTestId,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Trending from "../pages/Trending";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import renderer from "react-test-renderer";
import "jest-canvas-mock";
import { fetchCrypto } from "../config/API";

afterEach(() => {
  cleanup();
});

jest.mock("../config/API");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Render Error Message if Fetch Fails", async () => {
  axiosMock.get.mockRejectedValue({ data: {} });
  act(() => render(<Trending />));
  const loading = screen.getByTestId("loading");
  expect(loading).toBeInTheDocument();

  await waitFor(() => {
    const errorMsg = screen.getByTestId("fetchError");
    expect(errorMsg).toBeInTheDocument();
  });
});
