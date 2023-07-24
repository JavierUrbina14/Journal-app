import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginWithGoogleSignIn, startLoginWithEmailPassword } from '../../redux/auth/thunks'
import { useMemo, useState } from 'react'

const form = {
    email: '',
    password: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe ser de al menos 6 caracteres'],
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const dispatch = useDispatch();

    const {email, password, emailValid, passwordValid, onInputChange} = useForm(form, formValidations)

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true)
        dispatch(startLoginWithEmailPassword({email, password}))
        // dispatch(checkingAuthentication(email,password))
    }

    const handleGoogleSignIn = () => {
        dispatch( startLoginWithGoogleSignIn() )
    }


    return (
        <AuthLayout title='Login'>

            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            disabled={ isAuthenticating }
                            label="correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            helperText={emailValid}
                            error={!!emailValid && formSubmitted}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            disabled={ isAuthenticating }
                            label="Contraseña"
                            type="password"
                            placeholder="contraseña"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            helperText={passwordValid}
                            error={!!passwordValid && formSubmitted}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={!!errorMessage ? '': 'none'}>
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Button disabled={ isAuthenticating } type='submit' variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Button disabled={ isAuthenticating } onClick={handleGoogleSignIn} variant="contained" fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid container direction={"row"} justifyContent={"end"}>
                        <Link component={RouterLink} color={"inherit"} to={"/auth/register"}>
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>



    )
}
