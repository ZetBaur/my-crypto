import { List, ListItem } from '@mui/material';
import React, { useState } from 'react';

const periods = [
  {
    value: '1',
    text: 'D',
  },
  {
    value: '7',
    text: 'W',
  },
  {
    value: '30',
    text: 'M',
  },
  {
    value: '90',
    text: '3M',
  },
  {
    value: '180',
    text: '6M',
  },
  {
    value: '360',
    text: '12M',
  },
];

const Period = () => {
  const [activeItem, setActiveItem] = useState('D');

  return (
    <List
      sx={{
        display: 'flex',
        gap: '1rem',
        fontSize: '13px',
      }}
    >
      {periods.map((el) => (
        <ListItem
          sx={{
            padding: '2px 16px',
            border: `1px solid ${el.text === activeItem ? 'blue' : 'gray'}`,
            background: el.text === activeItem ? 'blue' : 'transparent',
            borderRadius: '4px',
            cursor: 'pointer',
            ':hover': {
              borderColor: 'blue',
              background: 'blue',
            },
          }}
          key={el.text}
          disablePadding
          onClick={() => setActiveItem(el.text)}
        >
          {el.text}
        </ListItem>
      ))}
    </List>
  );
};

export default Period;
