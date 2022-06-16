import {
  render,
  screen,
  cleanup,
  getByTestId,
  fireEvent,
  waitFor,
  getByText,
  act,
} from "@testing-library/react";
import CoinChart from "../components/CoinChart";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import renderer from "react-test-renderer";
import { fetchCoin, fetchHistory } from "../config/API";

afterEach(() => {
  cleanup();
});

jest.mock("axios");
jest.mock("../config/API");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Coin Chart heading should be rendered", async () => {
  await waitFor(() => {
    render(<CoinChart />);
    const heading = screen.getByText("Coin Price Data");
    expect(heading).toBeInTheDocument();
  });
});

test("Coin Chart should be rendered", async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [
      [1655189431100, 32260.558378485326],
      [1655189693519, 32374.969532405597],
    ],
  });
  act(() => render(<CoinChart />));
  const loading = screen.getByTestId("loading");
  expect(loading).toBeInTheDocument();
  expect(fetchHistory).toHaveBeenCalledTimes(1);
  waitFor(() => {
    const coinChart = screen.findByTestId("coinChart");
    expect(coinChart).toBeInTheDocument();
  });
});

test("Buttons should be rendered", async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [
      [1655189431100, 32260.558378485326],
      [1655189693519, 32374.969532405597],
    ],
  });
  act(() => render(<CoinChart />));
  const loading = screen.getByTestId("loading");
  expect(loading).toBeInTheDocument();
  expect(fetchHistory).toHaveBeenCalledTimes(1);
  waitFor(() => {
    const chartButton = screen.findByRole("button");
    expect(chartButton).toBeInTheDocument();
    const oneDay = screen.getByText("24 HOURS");
    expect(oneDay).toBeInTheDocument();
    const oneMonth = screen.getByText("30 DAYS");
    expect(oneMonth).toBeInTheDocument();
    const threeMonths = screen.getByText("3 MONTHS");
    expect(threeMonths).toBeInTheDocument();
    const oneYear = screen.getByText("1 YEAR");
    expect(oneYear).toBeInTheDocument();
  });
});

test("Render Error Message if Fetch Fails", async () => {
  axiosMock.get.mockRejectedValue({ data: {} });
  act(() => render(<CoinChart />));
  const loading = screen.getByTestId("loading");
  expect(loading).toBeInTheDocument();
  await waitFor(() => {
    const errorMsg = screen.getByTestId("fetchError");
    expect(errorMsg).toBeInTheDocument();
  });
});

test("Coin Chart matches snapshot", () => {
  const tree = renderer.create(<CoinChart />).toJSON();
  expect(tree).toMatchSnapshot();
});
