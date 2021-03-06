import CoinTable from "./pages/CoinTable";
import { Routes, Route } from "react-router-dom";
import CoinPage from "./pages/CoinPage";
import Navbar from "./components/Navbar";
import Trending from "./pages/Trending";
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<CoinTable />} />
        <Route path={"/trending"} element={<Trending />} />
        <Route path={"/coins/:id"} element={<CoinPage />} />
        <Route path ={'*'} element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
