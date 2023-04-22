import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import { MainLayout, AuthLayout } from './components';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './contexts/themeContext';

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
