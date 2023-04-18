import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout, Dashboard } from './components';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Dashboard />} />

            {/* <Route path='requests' element={<Requests />} />

            <Route path='agreedrequests' element={<AgreedRequests />} />

            <Route path='declinedrequests' element={<DeclinedRequests />} />

            <Route path='newrequest' element={<NewRequest />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
