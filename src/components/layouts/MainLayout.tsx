import { Outlet } from 'react-router-dom';
import { ScreenWrapper, Navbar, Header } from '../';

const MainLayout = () => {
  return (
    <div className='min-h-screen flex bg-backgoundLight dark:bg-backgroundDark'>
      <Navbar />

      <div>
        <Header />

        <ScreenWrapper>
          <Outlet />
        </ScreenWrapper>
      </div>
    </div>
  );
};

export default MainLayout;
