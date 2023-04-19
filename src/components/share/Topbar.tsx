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

  return (
    <header className='flex gap-x-4 justify-between'>
      <Input
        placeholder='Search'
        type='text'
        setSearch={setSearch}
        value={search}
      />

      <Button onClick={handleThemeToggle}>Contained</Button>
    </header>
  );
};

export default Topbar;
