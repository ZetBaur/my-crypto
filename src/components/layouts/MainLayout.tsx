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
    <div className='flex bg-white dark:bg-primary dark:text-white'>
      <button onClick={handleThemeToggle}>toggle Teme</button>

      <Navbar />

      <main>
        <Header />

        <ScreenWrapper>
          <Outlet />
        </ScreenWrapper>
      </main>
    </div>
  );
};

export default MainLayout;
