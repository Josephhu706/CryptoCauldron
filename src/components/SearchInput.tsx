import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import logo from '../assets/images/logo.svg'
import '../styles/SearchInputStyles.scss'

type Props = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput:React.FC<Props> = ({handleChange}) => {
  return (
    <div>
        <div data-testid='tableLogo'>
          <img src={logo} className="searchLogo" alt="logo"/>
            <Typography color="common.white" variant='h5' style={{margin:18, fontFamily:"Montserrat"}}>
                Cook up Coins in the Crypto Cauldron
            </Typography>
            </div>
        <TextField data-testid='search' inputProps={{ "data-testid": "content-input" }} onChange={handleChange} id="outlined-basic" label="Search for Coin Name or Symbol" variant="outlined" style={{marginBottom:20, width:"80%"}}/>
    </div>
  )
}

export default SearchInput