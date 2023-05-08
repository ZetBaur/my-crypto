import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setDays } from '../../store/features/coins/marketChartSlice';

export default function SelectedPeriod() {
  const dispatch = useAppDispatch();
  const days = useAppSelector((state) => state.marketChart.days);
  const interval = useAppSelector((state) => state.marketChart.interval);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDays(event.target.value));
  };

  const controlProps = (item: string) => ({
    checked: days === item,
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

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='7'
        name='radio-buttons-group'
      >
        {periods.map((el) => (
          <FormControlLabel
            key={el.value}
            value={el.value}
            sx={{
              background: days === el.value ? '#4688E4' : 'black',
              border: `1px solid ${days === el.value ? '#4688E4' : 'black'}`,
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
