import { useAppDispatch, useAppSelector } from '../../store/reduxHook';
import { setTheme } from '../../store/features/theme.slice';
import { Input, Button } from '../';
// import { useEffect } from 'react';

const Header = () => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header>
      <Input />

      <Button onClick={handleThemeToggle}>toggle</Button>
    </header>
  );
};

export default Header;
