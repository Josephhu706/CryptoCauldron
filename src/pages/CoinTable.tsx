import React, {useEffect, useState} from 'react';
import '../App.css';
import {fetchCrypto, Coin} from '../config/API'
import CoinInfo from '../components/CoinInfo'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material/';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress'
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Home = () => {
    const [coins, setCoins] = useState<Coin[]>([])
    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const tableHead = ['Coin', 'Price', 'Volume', '24hr Change', 'Market Cap']

    useEffect(() => {
      getCoins()
    }, [])

    const getCoins = async ()=>{
      setLoading(true)
      try{
        const newCoins = await fetchCrypto()
        setCoins(newCoins)
      }catch(error:any){
        setError(error)
      }
      setLoading(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(event.target.value)
    }

    const filterCoins = () =>{
      return coins.filter((coin)=> coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()))
    }

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
          <Container style={{textAlign: "center"}}>
            <Typography color="common.white" variant='h4' style={{margin:18, fontFamily:"Montserrat"}}>
              Cryptocurrency Prices
            </Typography>
            <TextField onChange={handleChange} id="outlined-basic" label="Search for Coin Name or Symbol" variant="outlined" style={{marginBottom:20, width:"80%"}}/>
            <TableContainer>
              {loading? (
                <CircularProgress />        
              ):(error? <h1>OOPS Something Went Wrong</h1>:( filterCoins().length === 0 ? 
              <h1>oops nothing found</h1> :
                <Table>
                  <TableHead style={{backgroundColor: "#EEBC1D"}}>
                    <TableRow>
                      {tableHead.map((head, index)=>(
                        <TableCell align={head === "Coin" ? "left" : "right"} key={index} style={{fontWeight:"700", fontFamily: "Montserrat"}}>
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterCoins().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row, index)=>{
                      const profit = row.price_change_percentage_24h > 0
                      return(
                        <TableRow key={index}>
                          <TableCell scope="row" style={{display: "flex", gap:15}}>
                            <img src={row.image} height="50" style={{marginBottom:10}}/>
                            <div style={{display:"flex", flexDirection:"column"}}>
                              <span
                                style={{
                                  textTransform:"uppercase",
                                  fontSize:22
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{color:"darkgrey"}}>{row.name}</span>
                            </div>
                          </TableCell>
                          
                          <TableCell align="right">
                              ${row.current_price.toFixed(2)} AUD
                          </TableCell>

                          <TableCell align="right">
                              ${row.total_volume.toLocaleString()}
                          </TableCell>

                          <TableCell align="right">
                          {row.price_change_24h < 0 ? (
                            <p style={{color:"red"}}>{row.price_change_24h.toFixed(2)}%</p>
                            ):(
                            <p style={{color:"limegreen"}}>{row.price_change_24h.toFixed(2)}%</p>
                            )}
                          </TableCell>

                          <TableCell align="right">
                            ${row.market_cap.toLocaleString()}
                          </TableCell>

                        </TableRow>
                      )
                  })}
                  </TableBody>
                </Table>
              )
              )}
              <Pagination style={{padding:20, width:"100%%" , display:"flex", justifyContent:"center"}} 
              count={parseInt((filterCoins().length / 10).toFixed(0))} color="primary"
              onChange={(event, value) => {
                setPage(value);
                window.scroll(0, 450);
              }} />
            </TableContainer>
          </Container>
      </ThemeProvider>
    )
}

export default Home