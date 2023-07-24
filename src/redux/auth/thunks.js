import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const startLoginWithGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout());

        dispatch(login(result))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const response = await signInWithEmailPassword({email, password})
        const {ok, errorMessage} = response
        if (!ok) return dispatch(logout( {errorMessage} ));

        dispatch(login(response))
    }
}

export const startCreatingUsingEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})
        if (!ok) return dispatch(logout({errorMessage}))
        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase()
        dispatch(logout());
    }
}