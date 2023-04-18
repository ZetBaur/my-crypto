import { Outlet } from 'react-router-dom';
import { ScreenWrapper } from '../';

const MainLayout = () => {
  return (
    <>
      <Menu />

      <main className={styles.main}>
        <Header />

        <ScreenWrapper>
          <Outlet />
        </ScreenWrapper>
      </main>
    </>
  );
};

export default MainLayout;
