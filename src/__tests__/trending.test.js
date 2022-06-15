import { render, screen, cleanup, waitForElement, getByTestId, fireEvent, waitFor, act} from '@testing-library/react'
import Trending from '../pages/Trending'
import '@testing-library/jest-dom'
import axiosMock from 'axios'
import renderer from 'react-test-renderer'
import 'jest-canvas-mock';
import {fetchCrypto} from '../config/API'

// //makes sure each test is starting from the same starting point
afterEach(()=>{
    cleanup()
})

jest.mock('axios');

it('should run', async () => {
    act(()=>render(<Trending />)) 
})
 

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


test("trending should be rendered", () => {
    render(<Trending />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument()
});

test("title should be rendered", () => {
    render(<Trending />);
    const trendingPage = screen.getByTestId("trendingPage");
    expect(trendingPage).toBeInTheDocument()
});


test("cauldron should be rendered", () => {
    render(<Trending />);
    const cauldron = screen.getByTestId("animation");
    expect(cauldron).toBeInTheDocument()
});

test("Coins should be rendered after fetching and can navigate to coin page", async () => {
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
    act(()=>render(<Trending />)) ;
    const loading= screen.getByTestId("loading")
    expect(loading).toBeInTheDocument();
    const coinContent = await screen.findByText('Bitcoin')
    expect(coinContent).toBeInTheDocument();
    const buttonEl = screen.queryByTestId("coinCircle")
    fireEvent.click(buttonEl)
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/coins/bitcoin`)
});

  
test('matches snapshot', () =>{
    const tree = renderer.create(<Trending/>).toJSON()
    expect(tree).toMatchSnapshot();
  })

