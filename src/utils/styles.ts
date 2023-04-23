import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BootstrapSelect = styled(InputBase)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fill: 'yellow',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}));
