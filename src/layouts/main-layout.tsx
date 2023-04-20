import { Outlet } from 'react-router-dom';
import { Navbar, Header } from '../components';

const MainLayout = () => {
  return (
    <div className='layout'>
      <Navbar />

      <div className='content'>
        <Header />

        <main className='main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
