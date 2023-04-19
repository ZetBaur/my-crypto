import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components';
import PrivateRoute from './components/utils/router/privateRoute';
import AuthRootPage from './components/pages/auth';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path='login' element={<AuthRootPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
