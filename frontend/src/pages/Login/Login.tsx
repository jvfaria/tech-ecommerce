import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormWrapper, LoginContainer } from './styles';
import SignUp from './SignUp/SignUp';
import { Creators as CreateAuthAction } from '../../redux/modules/Auth/ducks';
import { ISnackbar } from '../../redux/modules/Snackbar/ducks';
import SnackbarComponent from '../../components/SnackbarComponent';

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  password: Yup
    .string()
    .min(4, 'Senha deve possuir um mínimo de 4 caracteres')
    .required('Senha é obrigatória'),
});

interface ISnackbarProps {
  snackbars : ISnackbar[];
}

const Login: React.FC<ISnackbarProps> = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(CreateAuthAction.getUserLoginRequest(values.email, values.password));
    },
  });

  return (
    <Box flexGrow={1}>
      <SnackbarComponent />
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

        <Grid container item columnSpacing={2} sx={{ padding: '2rem', marginTop: '6rem' }}>
          <Grid
            container
            item
            lg={6}
            md={12}
            xs={12}
            sm={12}
            sx={{
              width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h5" sx={{ color: '#003A4D', paddingBottom: '1.5rem' }}>JÁ POSSUO CADASTRO</Typography>

            <FormWrapper onSubmit={formik.handleSubmit}>
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
            </FormWrapper>
            <Link to="/" style={{ color: '#8a8a8a', marginTop: '2.2rem', fontWeight: 'bold' }}>
              <span>Esqueci minha senha</span>
            </Link>

          </Grid>

          <Grid
            container
            item
            lg={6}
            md={12}
            xs={12}
            sm={12}
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
