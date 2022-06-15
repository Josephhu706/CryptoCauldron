import React, { useEffect, useState } from "react";
import { fetchCrypto, Coin } from "../config/API";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import "../styles/TrendingStyles.scss";
import { CssBaseline } from "@mui/material/";
import Lottie from "react-lottie-player";
import animationData from "../assets/images/cauldron.json";
import CircularProgress from "@mui/material/CircularProgress";
import callError from "../assets/images/call-error.svg";
import Typography from "@mui/material/Typography";
import MotionWrap from "../wrapper/MotionWrap";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Trending = () => {
  const [trending, setTrending] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    getCoins();
  }, []);

  const getCoins = async () => {
    setLoading(true);
    try {
      const newCoins = await fetchCrypto();
      let sortCoins: Array<Coin> = newCoins;
      sortCoins.sort((a, b) => {
        return b.total_volume - a.total_volume;
      });
      setTrending(sortCoins.slice(0, 10));
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div data-testid="trendingPage">
      <Typography
      data-testid="title"
        className="trendingTitle"
        color="common.white"
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat" }}
      >
        Top 10 Trending Coins By Volume
      </Typography>
      <div className="app__header app__flex" data-testid="TrendingPage">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {loading ? (
            <CircularProgress data-testid="loading" />
          ) : (error ? 
            <div data-testid="fetchError">
              <img
                src={callError}
                style={{ height: "20em" }}
                alt="fetchError"
              />
            </div>
           : 
            <div className="circlesContainer">
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ delay: 0.2, type: "tween", duration: 2 }}
                viewport={{ once: true }}
                className="app__header-circlesTop3"
              >
                <div className="circleContent">
                {trending.slice(0, 3).map((circle, index) => (
                  <motion.div
                  data-testid="coinCircle"
                    onClick={() => navigate(`/coins/${circle.id}`)}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5, type: "tween" }}
                    className="circle-cmp top3 app__flex"
                    key={`circle-${index}`}
                  >
                    <div className="overlay">
                      <h3 className="rank">{index + 1}</h3>
                    </div>
                    <img src={circle.image} alt="circle" />
                    <div className="coinName">{circle.name}</div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ delay: 0.3, type: "tween", duration: 2 }}
                viewport={{ once: true }}
                className="app__header-circlesTop7"
              >
                <div className="circleContent">
                {trending.slice(3, 7).map((circle, index) => (
                  <motion.div
                    data-testid="coinCircle"
                    onClick={() => navigate(`/coins/${circle.id}`)}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5, type: "tween" }}
                    className="circle-cmp app__flex"
                    key={`circle-${index}`}
                  >
                    <div className="overlay">
                      <h3 className="rank">{index + 4}</h3>
                    </div>
                    <img src={circle.image} alt="circle" />
                    <div className="coinName">{circle.name}</div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ delay: 0.6, type: "tween", duration: 2 }}
                viewport={{ once: true }}
                className="app__header-circlesTop10"
              >
                <div className="circleContent">
                {trending.slice(7).map((circle, index) => (
                  <motion.div
                    data-testid="coinCircle"
                    onClick={() => navigate(`/coins/${circle.id}`)}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5, type: "tween" }}
                    className="circle-cmp app__flex"
                    key={`circle-${index}`}
                  >
                    <div className="overlay">
                      <h3 className="rank">{index + 8}</h3>
                    </div>
                    <img src={circle.image} alt="circle" />
                    <div className="coinName">{circle.name}</div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            </div>
          )}
          <div data-testid="animation">
            <Lottie
              className="animation"
              loop
              animationData={animationData}
              play
              style={{ width: 720, height: 400 }}
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MotionWrap(Trending);
