import {
  Typography, Grid, TextField, Button,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { FormWrapper } from '../styles';

const validationSchema = Yup.object({
  username: Yup
    .string()
    .email('Insira um nome de usuário válido')
    .required('Nome de usuário é obrigatório'),
  email: Yup
    .string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  password: Yup
    .string()
    .min(8, 'Senha deve possuir um mínimo de 8 caracteres')
    .required('Senha é obrigatória'),
});

const SignUp: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    },

    validationSchema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Typography variant="h5" sx={{ color: '#003A4D', paddingBottom: '1.5rem' }}>QUERO ME CADASTRAR</Typography>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <TextField
              sx={{ bgcolor: '#FFF' }}
              fullWidth
              id="username"
              name="username"
              label="Nome de usuário"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ bgcolor: '#FFF' }}
              fullWidth
              id="signUpEmail"
              name="signUpEmail"
              label="Email"
              variant="outlined"
              value={formik.values.signUpEmail}
              onChange={formik.handleChange}
              error={formik.touched.signUpEmail && Boolean(formik.errors.signUpEmail)}
            />
          </Grid>

          <Grid item>
            <TextField
              sx={{ bgcolor: '#FFF' }}
              fullWidth
              id="signUpPassword"
              name="signUpPassword"
              label="Senha"
              variant="outlined"
              type="password"
              value={formik.values.signUpPassword}
              onChange={formik.handleChange}
              error={formik.touched.signUpPassword && Boolean(formik.errors.signUpPassword)}
            />
          </Grid>

          <Grid item>
            <TextField
              sx={{ bgcolor: '#FFF' }}
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirme sua senha"
              variant="outlined"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            />
          </Grid>
        </Grid>
        <Button fullWidth sx={{ marginTop: '1rem', height: '3rem' }} type="submit" color="primary" variant="contained">
          Cadastrar
        </Button>
      </FormWrapper>
    </>
  );
};

export default SignUp;
