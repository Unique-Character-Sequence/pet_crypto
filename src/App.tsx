import './App.scss'
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/HomePage/HomePage';
import CoinPage from './features/CoinPage/CoinPage';
import Header from './features/Header/Header';

const App = () => { 
  return (
    <div className='appPage'>
      <Header />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/coins/:id' Component={CoinPage} />
      </Routes>
    </div>
  );
};

export default App;
