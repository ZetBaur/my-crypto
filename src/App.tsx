import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout, Dashboard } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          {/* <Route path='requests' element={<Requests />} />

            <Route path='agreedrequests' element={<AgreedRequests />} />

            <Route path='declinedrequests' element={<DeclinedRequests />} />

            <Route path='newrequest' element={<NewRequest />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
