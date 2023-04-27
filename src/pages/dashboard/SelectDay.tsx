import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { pink } from '@mui/material/colors';
export default function Form() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: any) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='female'
        name='radio-buttons-group'
      >
        <FormControlLabel
          value='female'
          control={
            <Radio
              {...controlProps('a')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                },
              }}
            />
          }
          label='Female'
        />
        <FormControlLabel
          value='male'
          control={
            <Radio
              {...controlProps('c')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                },
              }}
            />
          }
          label='Male'
        />
        <FormControlLabel
          value='other'
          control={
            <Radio
              {...controlProps('d')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                },
              }}
            />
          }
          label='Other'
        />
      </RadioGroup>
    </FormControl>
  );
}
