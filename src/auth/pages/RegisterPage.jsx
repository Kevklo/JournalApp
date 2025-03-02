import { useMemo, useState } from "react";
import {Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { useForm } from './../../hooks/useForm';
import { startRegister } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout"

const formData = {displayName: '', email: '',password: ''}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector( state => state.auth)
  const isCheckingAuthentication = useMemo(() => (status == 'checking'), [status]);

  const [formSubmitted, setformSubmitted] = useState(false);

  const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener al menos 6 caracteres'],
    displayName: [(value) => value.length >=1, 'El nombre es obligatorio'],
  }

  const { 
    formState, displayName, email, password, onInputChange,
    emailValid, passwordValid, displayNameValid, isFormValid,
  } = useForm(formData, formValidations)

  const onSubmit = ( e ) => {
    e.preventDefault();
    setformSubmitted(true);
    if( !isFormValid ){
      return;
    }
    dispatch(startRegister(formState));

  }

  return (
  <AuthLayout title="Register">
    
    <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid2 container>
            <Grid2 size={{ xs: 12 }} sx={{ mt: 2}}>
              <TextField label="Nombre Completo" type="text" placeholder="Jane Doe" 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }} sx={{ mt: 2}}>
              <TextField label="Correo" type="email" placeholder="example@outlook.com" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid  && formSubmitted }
                helperText={ emailValid }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }} sx={{ mt: 2}}>
              <TextField label="Contraseña" type="Password" placeholder="Contraseña" 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid  && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid2>
          </Grid2>
  
          <Grid2 container spacing={2} sx={{mb:2, mt:1}}>
            { !!errorMessage && <Alert severity="error">{ errorMessage }</Alert> }
          </Grid2>
  
          <Grid2 container spacing={2} sx={{mb:2, mt:1}}>
            <Grid2 size={ 12 }>
              <Button variant='contained' fullWidth
                disabled={ isCheckingAuthentication }
                type="submit"
              >
                Crear Cuenta
              </Button>
            </Grid2>
          </Grid2>
  
            <Grid2 container direction='row'
            sx={{ justifyContent:'flex-end'}}
            >
              <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                ingresar
              </Link>
            </Grid2>
  
      </form>

    </AuthLayout>
  )
}
