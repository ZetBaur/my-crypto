import { List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../contexts/themeContext';
import { ICoin } from '../../../model/coinsTypes';

interface IProps {
  searchList: ICoin[] | undefined;
}

const SearchList = ({ searchList }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <List
      sx={{
        position: 'absolute',
        top: '110%',
        background: colors.secondary.DEFAULT,
        width: '50%',
        borderRadius: '4px',
        zIndex: '10',
        maxHeight: '400px',
        overflow: 'scroll',
      }}
    >
      {searchList &&
        searchList.map((el) => {
          return (
            <ListItem
              key={el.id}
              sx={{
                cursor: 'pointer',
              }}
            >
              {el.name}
            </ListItem>
          );
        })}
    </List>
  );
};

export default SearchList;
