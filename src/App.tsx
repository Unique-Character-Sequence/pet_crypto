import './App.scss'
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/HomePage/HomePage';
import CoinPage from './features/CoinPage/CoinPage';
import Header from './features/Header/Header';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Toaster />
      <div className='appPage'>
        <Header />
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/coins/:id' Component={CoinPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
