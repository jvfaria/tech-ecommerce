import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { LoginContainer } from './styles';
import SignUp from './SignUp/SignUp';

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  password: Yup
    .string()
    .min(8, 'Senha deve possuir um mínimo de 8 caracteres')
    .required('Senha é obrigatória'),
});

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box flexGrow={1}>
      <LoginContainer>
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '5px',
            background: '#003A4D',
            padding: '10px',
          }}
        >
          <PersonOutlineIcon
            fontSize="large"
            sx={{
              color: '#fff;', backgroundColor: 'transparent',
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: '1.75rem',
              fontWeight: '500',
              color: '#fff',
              paddingLeft: '2rem',
            }}
          >
            Identificação do Usuário
          </Typography>
        </Grid>

        <Grid container item columnSpacing={2} sx={{ padding: '8rem' }}>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sm="auto"
            sx={{
              width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h5" sx={{ color: '#003A4D', paddingBottom: '1.5rem' }}>JÁ POSSUO CADASTRO</Typography>

            <form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <TextField
                    sx={{ bgcolor: '#FFF' }}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ bgcolor: '#FFF' }}
                    fullWidth
                    id="password"
                    name="password"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                  />
                </Grid>
              </Grid>
              <Button fullWidth sx={{ marginTop: '1rem', height: '3rem' }} type="submit" color="success" variant="contained">
                Entrar
              </Button>
            </form>
            <Link to="/" style={{ color: '#8a8a8a', marginTop: '2.2rem', fontWeight: 'bold' }}>
              <span>Esqueci minha senha</span>
            </Link>

          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sm="auto"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <SignUp />
          </Grid>
        </Grid>
      </LoginContainer>
    </Box>
  );
};

export default Login;
