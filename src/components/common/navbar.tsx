import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { tokens } from '../../contexts/themeContext';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Coins from '../../pages/coins/Coins';

interface IProps {
  open: boolean;
}

const listItems = [
  {
    text: 'Coins',
    path: '',
    icon: <InboxIcon />,
  },

  {
    text: 'Dashboard',
    path: 'dashboard',
    icon: <InboxIcon />,
  },

  {
    text: 'Binance',
    path: 'binance',
    icon: <MailIcon />,
  },

  {
    text: 'BinanceWS',
    path: 'binancews',
    icon: <MailIcon />,
  },

  {
    text: 'Live Coin Watch',
    path: 'livecoinwatchrest',
    icon: <MailIcon />,
  },

  {
    text: 'BinanceRest',
    path: 'binancerest',
    icon: <MailIcon />,
  },

  {
    text: 'Transactions',
    icon: <MailIcon />,
  },

  {
    text: 'Portfolio',
    icon: <MailIcon />,
  },
];

const navbar = ({ open }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/binance');
  };

  return (
    <Box
      component='nav'
      sx={{
        background: colors.primary.DEFAULT,
        height: '100%',
      }}
    >
      <List
        sx={{
          color: '#7C7C7C',
          svg: {
            color: '#7C7C7C',
          },
        }}
      >
        {listItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(`${item.path}`)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
    </Box>
  );
};

export default navbar;
