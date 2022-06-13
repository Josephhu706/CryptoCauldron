import {useParams} from 'react-router-dom'
import React, {useEffect, useState} from 'react';
import {fetchCoin, Coin} from '../config/API'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import CoinChart from '../components/CoinChart';
import CircularProgress from '@mui/material/CircularProgress'
import '../styles/CoinPageStyles.scss'
import callError from '../assets/images/call-error.svg'
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CoinPage = () => {
  const {id} = useParams()
  const [coin, setCoin] =useState<any>()
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getCoin(id)
  }, [])

  const getCoin = async (id:any)=>{
    setLoading(true)
    try{
      const newCoin = await fetchCoin(id)
      setCoin(newCoin)
    }catch(error:any){
      setError(error)
    }
    setLoading(false)
  }



  return (
    <>
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          {loading? (
                  <CircularProgress data-testid='loading' />        
                ):(error? 
                <div data-testid='fetchError'>
                  <img src={callError} style={{"height": "20em"}} alt="fetchError"/>
                </div>
                :(
                  <div data-testid='coinPage' className='coinPageContainer'>

                    <div className="sideBar">
                      <img className='coinImage' src={coin?.image.large} alt={coin?.name} />
                      <Typography variant='h3' className="headingName">
                        {coin?.name}
                      </Typography>
                      <Typography variant='subtitle1' className="coinDescription">
                        {parse(`${coin?.description.en.split(". ")[0]}`)}
                      </Typography>
                      <div className="marketData">
                        <span className="coinRank">
                          <Typography variant="h5" className="headingName">Rank: <span className="marketDataContent">{coin?.market_cap_rank}</span></Typography>
                        </span>
                        <span className="coinPrice">
                          <Typography variant="h5" className="headingName">Price: <span className="marketDataContent">${coin?.market_data.current_price.aud.toLocaleString()}</span></Typography>
                        </span>
                        <span className="coinCap">
                          <Typography variant="h5" className="headingName">Market Cap: <span className="marketDataContent">${coin?.market_data.market_cap.aud.toLocaleString()}</span></Typography>
                        </span>
                      </div>
                    </div>


                    <div className="coinChart">
                      <CoinChart coin={coin?.id}/>
                    </div>

                </div>
                )
                )}
      </ThemeProvider>
    </>
  )
}

export default CoinPage