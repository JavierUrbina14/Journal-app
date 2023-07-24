import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUsingEmailPassword } from '../../redux/auth/thunks'

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe tener más de 6 letras'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

const form = {
    email: '',
    password: '',
    displayName: '',
}

export const RegisterPage = () => {

    const {status, errorMessage} = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        displayName, email, password, onInputChange, isFormValid,
        displayNameValid, emailValid, passwordValid,
    } = useForm(form, formValidations)


    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(startCreatingUsingEmailPassword({email, password, displayName}))
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Tu nombre"
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={ emailValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="contraseña"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={ passwordValid }
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={!!errorMessage ? '': 'none'}>
                            <Alert severity='error'>
                                { errorMessage }
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth disabled={isCheckingAuthentication}>
                                Crear cuenta
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid container direction={"row"} justifyContent={"end"}>
                        <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color={"inherit"} to={"/auth/login"}>
                            Inicia sesión
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>



    )
}
