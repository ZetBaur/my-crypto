import { useAppDispatch, useAppSelector } from '../../store/reduxHook';
import { setTheme } from '../../store/features/theme.slice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Header = () => {
  const [search, setSearch] = useState('');
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className='flex gap-x-4 justify-between'>
      <TextField variant='outlined' fullWidth size='small' />

      <Button variant='contained' size='small'>
        Contained
      </Button>

      {/* <Input
        placeholder='Search'
        type='text'
        setSearch={setSearch}
        value={search}
      />

      <Button onClick={handleThemeToggle}>Contained</Button> */}
    </header>
  );
};

export default Header;
