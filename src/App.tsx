import CoinTable from './pages/CoinTable';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CoinPage from './pages/CoinPage';
import Navbar from './components/Navbar';

function App() {

  return (
    <div>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<CoinTable />}/>
        <Route path={'/coins/:id'} element={<CoinPage />}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
