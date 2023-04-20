import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <TextField variant='outlined' fullWidth size='small' />

      <Button variant='contained' size='small'>
        Contained
      </Button>
    </Box>
  );
};

export default Header;
