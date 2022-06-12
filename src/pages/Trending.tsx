import React, {useEffect, useState} from 'react';
import {fetchCrypto, Coin} from '../config/API'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {motion} from 'framer-motion'
import '../styles/TrendingStyles.scss'
import { CssBaseline } from '@mui/material/';
import Lottie from 'react-lottie-player';
import animationData from '../assets/images/cauldron.json';
import CircularProgress from '@mui/material/CircularProgress'
import callError from '../assets/images/call-error.svg'
import Typography from '@mui/material/Typography';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const scaleVariants = {
    whileInView:{
      scale: [0,1],
      opacity: [0, 1],
      transition:{
        duration: 2,
        ease: 'easeInOut'
      }
    }
  }
  
const Trending = () => {
    const [trending, setTrending] = useState<Coin[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        getCoins()
    }, [])

    const getCoins = async ()=>{
        setLoading(true)
        try{
        const newCoins = await fetchCrypto()
        console.log(newCoins)
        let sortCoins: Array<Coin> = newCoins
        sortCoins.sort((a,b)=>{return b.total_volume-a.total_volume})
        setTrending(sortCoins.slice(0,10))
        }catch(error:any){
            setError(error)
        }
        setLoading(false)
    }
      
  return (
    <div className='app__header app__flex' data-testid='TrendingPage'>
        <Typography color="common.white" variant='h4' style={{margin:18, fontFamily:"Montserrat"}}>
                Trending Coins By Volume
        </Typography>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          {loading?(
            <CircularProgress data-testid='loading' />   
          ):(error? 
            <div data-testid='fetchError'>
                <img src={callError} style={{"height": "20em"}} alt="fetchError"/>
            </div>
          :
          <div>
          <motion.div 
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          viewport={{ once: true }}
          className="app__header-circlesTop3"
          >
              {trending.slice(0,3).map((circle, index)=>(
              <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle.image} alt="circle" />
              </div>
              ))}
          </motion.div>
          <motion.div 
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          viewport={{ once: true }}
          className="app__header-circlesTop7"
          >
              {trending.slice(3,7).map((circle, index)=>(
              <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle.image} alt="circle" />
              </div>
              ))}
          </motion.div>
          <motion.div 
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          viewport={{ once: true }}
          className="app__header-circlesTop10"
          >
              {trending.slice(7).map((circle, index)=>(
              <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle.image} alt="circle" />
              </div>
              ))}
          </motion.div>

          <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: 720, height: 500 }}
          />
      </div>
    )}
       
        </ThemeProvider>
    </div>
  )
}

export default Trending