import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CoinPage = () => {
  return (
    <div>CoinPage</div>
  )
}

export default CoinPage