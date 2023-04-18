import { Outlet } from 'react-router-dom';
import { ScreenWrapper, Navbar } from '../';

const MainLayout = () => {
  return (
    <div className='flex bg-primary'>
      <Navbar />

      <main>
        {/* <Header /> */}

        <ScreenWrapper>
          <Outlet />
        </ScreenWrapper>
      </main>
    </div>
  );
};

export default MainLayout;
