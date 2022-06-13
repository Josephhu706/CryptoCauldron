import React, {useEffect, useState} from 'react';
import {fetchHistory} from '../config/API'
import CircularProgress from '@mui/material/CircularProgress'
import callError from '../assets/images/call-error.svg'
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import '../styles/CoinChartStyles.scss'
import {Line} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );
  
  
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

type Props = {
    coin: string
}

const CoinChart:React.FC<Props> = ({coin}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [history, setHistory] = useState<any>([])
  const [days, setDays] = useState<number>(365)
  const coinPrice = [];
  const coinTimestamp = [];

  useEffect(() => {
    getHistory(coin, days)
  }, [])

  const getHistory = async (id:string, days:number)=>{
    setLoading(true)
    try{
      const newCoin = await fetchHistory(id, days)
      setHistory(newCoin.prices)
    }catch(error:any){
      setError(error)
    }
    setLoading(false)
  }

  for (let i = 0; i < history?.data?.history?.length; i++) {
    coinTimestamp.push(
      new Date(history.data.history[i].timestamp).toLocaleDateString()
    );
    coinPrice.push(history.data.history[i].price);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in AUD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };
  


  return (
    <>
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <div className='container'>
          {loading? (
                  <CircularProgress data-testid='loading' />        
                ):(error? 
                <div data-testid='fetchError'>
                  <img src={callError} style={{"height": "20em"}} alt="fetchError"/>
                </div>
                :(
                <div data-testid='coinChart' className='coinChart'>
                  <Line data={{labels: history.map((coin:Array<number>)=>{
                     let date = new Date(coin[0]);
                     let time =
                       date.getHours() > 12
                         ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                         : `${date.getHours()}:${date.getMinutes()} AM`;
                     return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets:[
                    {
                      data: history.map((coin:any) => coin[1]),
                      label: `Price ( Past ${days} Days ) in AUD`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                  }} />


                </div>
                )
                )}
          </div>
      </ThemeProvider>
    </>
  )
}

export default CoinChart