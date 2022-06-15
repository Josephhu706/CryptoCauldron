import { render, screen, cleanup, getByTestId, fireEvent, waitFor, getByText, act} from '@testing-library/react'
import CoinPage from '../pages/CoinPage'
import '@testing-library/jest-dom'
import axiosMock from 'axios'
import renderer from 'react-test-renderer'
import {fetchCoin, fetchHistory} from '../config/API'


afterEach(()=>{
    cleanup()
})

jest.mock('axios');
jest.mock('../config/API')

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("Coin Page component should be rendered", () => {
    act(()=>render(<CoinPage/>))
    const coinPage = screen.getByTestId("coinPage");
    expect(coinPage).toBeInTheDocument()
});


test("Render Error Message if Fetch Fails", async () => {
    axiosMock.get.mockRejectedValue({data: []})
    act(()=>render(<CoinPage/>))
    const loading= screen.getByTestId("loading")
    expect(loading).toBeInTheDocument();
    expect(fetchCoin).toHaveBeenCalledTimes(1)
    await waitFor(()=>{
      const errorMsg = screen.getByTestId('fetchError')
      expect(errorMsg).toBeInTheDocument();
    })
});

test("Render coin information", async () => {
    axiosMock.get.mockResolvedValueOnce({data: {name: "Bitcoin", id:"bitcoin"}})
    act(()=>render(<CoinPage/>))
    const loading= screen.getByTestId("loading")
    expect(loading).toBeInTheDocument();
    expect(fetchCoin).toHaveBeenCalledTimes(1)
    waitFor(()=>{
        const coinContent = screen.findByText('Bitcoin')
        const coinName = screen.findByTestId('coinName')
        expect(coinName).toBeInTheDocument()
        expect(coinContent).toBeInTheDocument()
    })
});

test("Render Home Button and navigate back Home", async () => {
    axiosMock.get.mockResolvedValueOnce({data: {name: "Bitcoin", id:"bitcoin"}})
    act(()=>render(<CoinPage/>))
    const loading= screen.getByTestId("loading")
    expect(loading).toBeInTheDocument();
    expect(fetchCoin).toHaveBeenCalledTimes(1)
    waitFor(()=>{
        const homeButton = screen.findByText('BACK TO HOME')
        expect(homeButton).toBeInTheDocument()
        fireEvent.click(homeButton)
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/`)
    })
});

  
test('Coin page matches snapshot', () =>{
    const tree = renderer.create(<CoinPage/>).toJSON()
    expect(tree).toMatchSnapshot();

})



