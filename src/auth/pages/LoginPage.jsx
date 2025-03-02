import { useMemo } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { startGoogleSignIn, startLogin } from './../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from './../../hooks';

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  

  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();
  const {email, password, onInputChange} = useForm( formData )

  

  const onSubmit = ( e ) => {
    e.preventDefault();
    dispatch( startLogin(email, password) );
  }

  const onGoogleSignIn = ( e ) => {
    e.preventDefault();
    dispatch( startGoogleSignIn() );
  }

  const isAuthenticating = useMemo( () => status === 'checking', [status])

  return (
    <AuthLayout title="Login">

      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn'>
        <Grid2 container>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2}}>
            <TextField 
              label="Correo" type="email" placeholder="example@outlook.com" fullWidth
              name='email'
              value={email}
              onChange={ onInputChange }
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2}}>
            <TextField 
              label="Contraseña" type="Password" placeholder="Contraseña" fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} sx={{mb:2, mt:1}}>
          { !!errorMessage && <Alert severity="error">{ errorMessage }</Alert> }
        </Grid2>

          <Grid2 container spacing={2} sx={{mb:2, mt:1}}>
            <Grid2 size={{ xs:12, lg:6 }}>
              <Button variant='contained' fullWidth
                type='submit'
                disabled={ isAuthenticating }
              >
                Login
              </Button>
            </Grid2>
            <Grid2 size={{ xs:12, lg:6 }}>
              <Button variant='contained' fullWidth
                onClick={ onGoogleSignIn }
                disabled={ isAuthenticating }
              >
                <Google />
                <Typography sx={{ ml:1 }}>Google</Typography>
              </Button>
            </Grid2>

          </Grid2>

          <Grid2 container direction='row'
          sx={{ justifyContent:'flex-end'}}
          >
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid2>


      </form>

  </AuthLayout>
)
}
