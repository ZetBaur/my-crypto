import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setDays, setInterval } from '../../store/features/coins/coinsSlice';

interface IProps {
  type: string;
}

export default function SelectedPeriod({ type }: IProps) {
  const dispatch = useAppDispatch();

  const feature = useAppSelector((state) =>
    type === 'period' ? state.coins.days : state.coins.interval
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    type === 'period'
      ? dispatch(setDays(event.target.value))
      : dispatch(setInterval(event.target.value));
  };

  const controlProps = (item: string) => ({
    checked: feature === item,
    onChange: handleChange,
    value: item,
    name: 'period',
    inputProps: { 'aria-label': item },
  });

  const periods = [
    {
      value: '1',
      text: 'Day',
    },
    {
      value: '7',
      text: 'Week',
    },
    {
      value: '30',
      text: 'Month',
    },
    {
      value: '90',
      text: '3 Months',
    },
    {
      value: '180',
      text: '6 Months',
    },
    {
      value: '360',
      text: '1 Year',
    },
  ];

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

  const options = () => {
    if (type === 'period') {
      return periods;
    } else {
      return intervals;
    }
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='7'
        name='radio-buttons-group'
      >
        {options().map((el) => (
          <FormControlLabel
            key={el.value}
            value={el.value}
            sx={{
              background: feature === el.value ? 'green' : 'black',
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
