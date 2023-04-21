import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    backgroundColor: '#000000',
    border: '1px solid #000000',
    '&:focus': {
      borderColor: '#000000',
    },
  },
  '& .MuiSvgIcon-root': {
    color: 'yellow',
  },
}));
