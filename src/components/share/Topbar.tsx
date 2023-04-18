import { useAppDispatch, useAppSelector } from '../../store/reduxHook';
import { setTheme } from '../../store/features/theme.slice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Topbar = () => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className='flex justify-between'>
      <TextField fullWidth sx={{ mr: 16 }} />

      <Button variant='contained' onClick={handleThemeToggle}>
        Contained
      </Button>
    </header>
  );
};

export default Topbar;
