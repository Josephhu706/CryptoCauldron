import CoinTable from './pages/CoinTable';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CoinPage from './pages/CoinPage';
import Navbar from './components/Navbar';
import Trending from './pages/Trending'

function App() {

  return (
    <div>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<CoinTable />}/>
        <Route path={'/trending'} element={<Trending />}/>
        <Route path={'/coins/:id'} element={<CoinPage />}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
