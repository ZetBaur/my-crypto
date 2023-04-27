import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setInterval } from '../../store/features/coins/coinsSlice';

export default function SelectedInterval() {
  const dispatch = useAppDispatch();
  const days = useAppSelector((state) => state.coins.days);
  const interval = useAppSelector((state) => state.coins.interval);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInterval(event.target.value));
  };

  const controlProps = (item: string) => ({
    checked: interval === item,
    onChange: handleChange,
    value: item,
    name: 'period',
    inputProps: { 'aria-label': item },
  });

  const handleDisable = (el: { value: string; text: string }) => {
    if (el.value === 'hourly' && (days === '180' || days === '360'))
      return true;
  };

  const intervals = [
    {
      value: 'hourly',
      text: 'Hourly',
    },
    {
      value: 'daily',
      text: 'Daily',
    },
  ];

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='7'
        name='radio-buttons-group'
      >
        {intervals.map((el) => (
          <FormControlLabel
            key={el.value}
            value={el.value}
            disabled={handleDisable(el)}
            sx={{
              background: interval === el.value ? 'green' : 'black',
              border: '1px solid gray',
              borderRadius: '4px',
              padding: '0 4px',
              span: {
                fontSize: '13px',
              },
              ':hover': {
                color: 'gray',
              },
              marginLeft: '0',
            }}
            control={
              <Radio
                {...controlProps(el.value)}
                sx={{
                  display: 'none',
                }}
              />
            }
            label={el.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
