import { loginUser, logoutFirebase, registerUser, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() ) ;
  }
}

export const startGoogleSignIn = () => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );
    const result = await signInWithGoogle();
    if( !result.ok ){
      return dispatch( logout( result.errorMessage) )
    } else {
      dispatch( login( result ));
    }
  }
}

export const startLogin = ( email, password ) => {
  return async( dispatch ) => {    

    dispatch( checkingCredentials() );    
    const result = await loginUser({email, password});
    
    if( !result.ok ){
      return dispatch( logout( result ))
    } else {
      dispatch( login( result ));
    }

  }
}


export const startRegister = ({ email, password, displayName}) => {
  return async( dispatch ) => {
    
    dispatch( checkingCredentials() );

    const resp = await registerUser({ email, password, displayName});
    if(!resp.ok){
      return dispatch( logout(resp))
    } else {
      dispatch(login(resp) )
    }

  }
}

export const startLogout = () => {
  return async( dispatch ) => {

    await logoutFirebase();
    dispatch( logout() );
    dispatch( clearNotesLogout() );

  }
}