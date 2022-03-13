import { TextField, TextFieldProps } from '@mui/material';
import styled from 'styled-components';

export const CustomTextField = styled(TextField)<TextFieldProps>(
  () => ({
    '& .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
      '-webkit-text-fill-color': '#000',
      color: '#000',
      fontSize: '1.2rem',
      textAlign: 'center',
    },
    width: '9rem',
  }),
);
