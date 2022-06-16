import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";
import notFound from "../assets/images/404.svg";
import "../styles/notFoundPage.scss";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div data-testid="notFound" className="notFound container">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <img src={notFound} alt="" />
        <Button
          data-testid="backButton"
          className="backButton"
          variant="outlined"
          onClick={() => navigate("/")}
        >
          <ArrowBackIosIcon /> Back To Home
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default NotFound;
