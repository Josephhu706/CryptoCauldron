import React, { useEffect, useState } from "react";
import { fetchHistory, SingleCoin } from "../config/API";
import CircularProgress from "@mui/material/CircularProgress";
import callError from "../assets/images/call-error.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";
import "../styles/CoinChartStyles.scss";
import { Line } from "react-chartjs-2";
import Button from "@mui/material/Button";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
    mode: "dark",
  },
});

type Props = {
  coin: any;
};

const CoinChart: React.FC<Props> = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<any>([]);
  const [days, setDays] = useState<number>(1);
  const [lineData, setLineData] = useState([]);
  const chartTimelines = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  useEffect(() => {
    getHistory(coin, days);
    // eslint-disable-next-line
  }, []);

  const getHistory = async (id: string, days: number) => {
    setLoading(true);
    try {
      const newCoin = await fetchHistory(id, days);
      setHistory(newCoin);

      let newLineData = newCoin.map((coin: Array<number>) => {
        let date = new Date(coin[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      });
      setLineData(newLineData);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  const createHistory = (value: number) => {
    setDays(value);
    createLine();
  };

  const createLine = async () => {
    let newLineData = history.map((coin: Array<number>) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });
    setLineData(newLineData);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="container">
          <h1 className="coinHeading">Coin Price Data</h1>
          {loading ? (
            <div className="loadingProgressContent">
              <CircularProgress
                className="loadingProgress"
                data-testid="loading"
              />
            </div>
          ) : error ? (
            <div data-testid="fetchError" className="fetchError">
              <img
                src={callError}
                style={{ height: "20em" }}
                alt="fetchError"
              />
            </div>
          ) : (
            <>
              <div data-testid="coinChart" className="coinChart">
                <Line
                  data={{
                    labels: lineData,
                    datasets: [
                      {
                        data: history?.map((coin: any) => coin[1]),
                        label: `Price ( Past ${days} Days ) in AUD`,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}
                />
              </div>
              <div className="coinChartButtons">
                {chartTimelines.map((timeline, index) => {
                  return (
                    <span key={index}>
                      <Button
                        className="chartButton"
                        onClick={() => {
                          createHistory(timeline.value);
                        }}
                        variant="outlined"
                      >
                        {timeline.label}
                      </Button>
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default CoinChart;
