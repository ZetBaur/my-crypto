import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages';
import { MainLayout, AuthLayout } from './components';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './contexts/themeContext';
import Binance from './pages/dashboard/Binance';
import BinanceWS from './pages/binance/BinanceWS';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='/binance' element={<Binance />} />
              <Route path='/binancews' element={<BinanceWS />} />
            </Route>

            <Route path='login' element={<AuthLayout />} />
            <Route path='register' element={<AuthLayout />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
