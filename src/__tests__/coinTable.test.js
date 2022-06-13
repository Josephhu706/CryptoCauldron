import { render, screen, cleanup, waitForElement, getByTestId, fireEvent, } from '@testing-library/react'
import CoinTable from '../pages/CoinTable'
import '@testing-library/jest-dom'
import axiosMock from 'axios'
import renderer from 'react-test-renderer'


// //makes sure each test is starting from the same starting point
afterEach(()=>{
    cleanup()
})

jest.mock('axios');

//test if coin table component is rendered
test("table should be rendered", () => {
    render(<CoinTable />);
    const coinTable = screen.getByTestId("coinTable");
    expect(coinTable).toBeInTheDocument()
  });

  //test if logo is rendered
test("table logo should be rendered", () => {
    render(<CoinTable />);
    const tableLogo = screen.getByTestId("tableLogo");
    expect(tableLogo).toBeInTheDocument()
});

//test if search bar is rendered
test("search input should be rendered", () => {
    render(<CoinTable />);
    const inputEl= screen.getByTestId("search");
    expect(inputEl).toBeInTheDocument();
});

test("search error should be not be visible", () => {
  render(<CoinTable />);
  const errorEl = screen.queryByTestId('emptySearch');
  expect(errorEl).not.toBeInTheDocument()
});

//test fetching API
test("Coins should be rendered after fetching", async () => {
  axiosMock.get.mockResolvedValueOnce({data: [            
    {"id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 39161,
    "market_cap": 746975620874,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 822780677096,
    "total_volume": 37007140684,
    "high_24h": 41702,
    "low_24h": 38967,
    "price_change_24h": -2356.366268313068,
    "price_change_percentage_24h": -5.67563,
    "market_cap_change_24h": -44140206844.06592,
    "market_cap_change_percentage_24h": -5.57949,
    "circulating_supply": 19065212,
    "total_supply": 21000000,
    "max_supply": 21000000,
    "ath": 93482,
    "ath_change_percentage": -57.95187,
    "ath_date": "2021-11-10T14:24:11.849Z",
    "atl": 72.61,
    "atl_change_percentage": 54035.65854,
    "atl_date": "2013-07-05T00:00:00.000Z",
    "roi": null,
    "last_updated": "2022-06-12T03:58:19.387Z"
    }
]})
  render(<CoinTable />);
  const loading= screen.getByTestId("loading")
  expect(loading).toBeInTheDocument();
  const tableContent = await screen.findByText('Bitcoin')
  expect(tableContent).toBeInTheDocument();
});

//test for not fetching data error screen
test("Render Error Message if Fetch Fails", async () => {
  axiosMock.get.mockRejectedValue({data: {'error': 'error'}})
  render(<CoinTable />);
  const errorMsg = await screen.findByTestId('fetchError')
  expect(errorMsg).toBeInTheDocument();
});


// //test for route pagination?

// //test for filtering?
// test('filtering should work', ()=>{
//   // const coins = {content:[ {"id": "bitcoin","symbol": "btc", "name": "Bitcoin"},{"id": 'ethereum', "symbol": 'eth', "name": 'Ethereum'}]}
//   const wrapper = shallow(<CoinTable/>);
//   const instance = wrapper.instance()
//   const func = instance.filterCoins()
//   console.log(instance.debug())
//   const mockedChangeEvent = { target: { value: 'Bitcoin' } };
//   expect(wrapper.state('search')).toBe('');
//   wrapper.find('#searchCoin').simulate('change', mockedChangeEvent);
//   expect(wrapper.state('search')).toBe('Bitcoin');
//   expect(wrapper.find('#tablebody').children()).toHaveLength(1);
// })

test("search input should change", () => {
  render(<CoinTable />);
  const searchInputEl = screen.getByTestId('search').querySelector('input');
  //we have a dummy test value
  const testValue = 'test'
  //if we fire an onchange vent for the input 
  fireEvent.change(searchInputEl, {target: {value: testValue}})
  expect(searchInputEl.value).toBe(testValue);
});

test("Pagination should be rendered", () => {
  render(<CoinTable />);
  const pagination= screen.getByTestId("pagination");
  expect(pagination).toBeInTheDocument();
});

test('matches snapshot', () =>{
  const tree = renderer.create(<CoinTable/>).toJSON()
  expect(tree).toMatchSnapshot();
})