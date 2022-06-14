import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/images/logo.svg'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useState} from 'react'
import '../styles/NavbarStyles.scss'
import {useNavigate} from "react-router-dom";



export default function Navbar() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <div className='navBar'>
                <Toolbar className='toolBar'>
                    <div className='logo' onClick={()=>navigate('/')}>
                        <img src={logo} alt="logo" />
                    </div>
                </Toolbar>
                <div className='navTabs'>
                    <Tabs onChange={handleChange} indicatorColor='secondary' textColor='inherit' value={value}>
                        <Tab label="Home" onClick={()=>navigate('/')}/>
                        <Tab label="Trending" onClick={()=>navigate('/trending')}/>
                    </Tabs>
                </div>
            </div>
        </AppBar>
        </Box>
    );
}