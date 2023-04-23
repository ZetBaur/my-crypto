import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    // position: 'relative',
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #ced4da',
    // fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      // borderRadius: 4,
      // borderColor: '#3C3C3C',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
