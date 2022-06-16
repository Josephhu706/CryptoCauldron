import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchCoin, SingleCoin } from "../config/API";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";
import CoinChart from "../components/CoinChart";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/CoinPageStyles.scss";
import callError from "../assets/images/call-error.svg";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<SingleCoin>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coinId, setCoinId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    getCoin(id);
    // eslint-disable-next-line
  }, []);

  const getCoin = async (id: string | undefined) => {
    setLoading(true);
    try {
      const newCoin = await fetchCoin(id);
      setCoin(newCoin);
      setDescription(newCoin.description.en);
      setCoinId(newCoin.id);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div data-testid="coinPage">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {loading ? (
          <div className="loadingContainer">
            <CircularProgress data-testid="loading" />
          </div>
        ) : error ? (
          <div data-testid="fetchError" className="fetchError">
            <img src={callError} style={{ height: "20em" }} alt="fetchError" />
          </div>
        ) : (
          <div className="coinPageContainer">
            <div data-testid="sideBar" className="sideBar">
              <Button
                data-testid="backButton"
                className="backButton"
                variant="outlined"
                onClick={() => navigate("/")}
              >
                <ArrowBackIosIcon /> Back To Home
              </Button>

              <img
                className="coinImage"
                src={coin?.image.large}
                alt={coin?.name}
              />
              <Typography
                variant="h3"
                data-testid="coinName"
                className="headingName"
              >
                {coin?.name}
              </Typography>
              <Typography variant="subtitle1" className="coinDescription">
                {parse(`${description?.split(". ")[0]}`)}
              </Typography>
              <div className="marketData">
                <span className="coinTag coinRank">
                  <Typography variant="h5" className="headingName">
                    Rank:{" "}
                    <span className="marketDataContent">
                      {coin?.market_cap_rank}
                    </span>
                  </Typography>
                </span>
                <span className="coinTag coinPrice">
                  <Typography variant="h5" className="headingName">
                    Price:{" "}
                    <span className="marketDataContent">
                      ${coin?.market_data.current_price.aud.toLocaleString()}
                    </span>
                  </Typography>
                </span>
                <span className="coinTag coinCap">
                  <Typography variant="h5" className="headingName">
                    Market Cap:{" "}
                    <span className="marketDataContent">
                      ${coin?.market_data.market_cap.aud.toLocaleString()}
                    </span>
                  </Typography>
                </span>
              </div>
            </div>

            <div className="coinChart">
              <CoinChart coin={coinId} />
            </div>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default CoinPage;
