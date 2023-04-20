import { Outlet } from 'react-router-dom';
import { Navbar, Header } from '../components';

const MainLayout = () => {
  return (
    <div className='min-h-screen flex bg-backgoundLight dark:bg-backgroundDark'>
      <Navbar />

      <div className='grow p-4'>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
