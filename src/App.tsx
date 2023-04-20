import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import { MainLayout, AuthLayout } from './components';
import AuthRootPage from './pages/auth';

function App() {
  return (
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
  );
}

export default App;
