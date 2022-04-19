/* eslint-disable no-restricted-globals */
import {
  Backdrop,
  Box, Button, CircularProgress, Grid, TextField, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Link, useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorOutline } from '@mui/icons-material';
import {
  ErrorContainer, FormWrapper, LoginContainer,
} from './styles';
import SignUp from './SignUp/SignUp';
import { useAuth } from '../../hooks/auth';
import { IState } from '../../redux/store';
import { Creators as CreateLoadingAction } from '../../redux/modules/Loading/ducks';

interface IValuesProps {
  email: string;
  password: string;
}

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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isLoading } = useSelector((state: IState) => state.loading);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (values: IValuesProps) => {
    login(values);
    setTimeout(() => {
      navigate('/');
    }, 3000);

    setTimeout(() => {
      location.reload();
    }, 3000);

    setTimeout(() => {
      dispatch(CreateLoadingAction.loadingSuccess());
    }, 3000);
  }, [dispatch, login, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(CreateLoadingAction.loadingRequest());
      handleSubmit(values);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    isLoading ? (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
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
                    {formik.errors.email && (
                      <ErrorContainer>
                        <ErrorOutline sx={{ fontSize: '1.2rem', paddingRight: '3px' }} />
                        {formik.errors.email}
                      </ErrorContainer>

                    )}
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
                    {formik.errors.password && (
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        fontSize: '0.8rem',
                        color: '#b00020',
                        fontWeight: '400',
                        marginTop: '3px',
                      }}
                      >
                        <ErrorOutline sx={{ fontSize: '1.2rem', paddingRight: '3px' }} />
                        {formik.errors.password}
                      </span>
                    )}
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
    )
  );
};

export default Login;
