import { Outlet } from 'react-router-dom';
import { Navbar, Topbar } from '../';

const MainLayout = () => {
  return (
    <div className='min-h-screen flex bg-backgoundLight dark:bg-backgroundDark'>
      <Navbar />

      <main className='grow p-4'>
        <Topbar />

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
