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
import { tokens } from '../../theme';
import { useTheme } from '@mui/material/styles';

interface IProps {
  open: boolean;
}

const listItems = [
  {
    text: 'Dashboard',
    icon: <InboxIcon />,
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
