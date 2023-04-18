import { Outlet } from 'react-router-dom';
import { ScreenWrapper, Navbar, Header } from '../';
import { useEffect, useState } from 'react';

const MainLayout = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='min-h-screen flex'>
      {/* <button onClick={handleThemeToggle}>toggle Teme</button> */}

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
