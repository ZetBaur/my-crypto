import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <header className='flex gap-x-4 justify-between'>
      <TextField variant='outlined' fullWidth size='small' />

      <Button variant='contained' size='small'>
        Contained
      </Button>
    </header>
  );
};

export default Header;
