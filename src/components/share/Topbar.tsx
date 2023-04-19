import { useAppDispatch, useAppSelector } from '../../store/reduxHook';
import { setTheme } from '../../store/features/theme.slice';
import { Button, Input } from '../';
import { useState } from 'react';

const Topbar = () => {
  const [search, setSearch] = useState('');
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <header className='flex gap-x-4 justify-between'>
      <Input
        placeholder='Search'
        type='text'
        handleChange={handleChange}
        value={search}
      />

      <Button onClick={handleThemeToggle}>Contained</Button>
    </header>
  );
};

export default Topbar;
