import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import { MainLayout, AuthLayout } from './components';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className='app'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<Dashboard />} />
              </Route>

              <Route path='login' element={<AuthLayout />} />
              <Route path='register' element={<AuthLayout />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
