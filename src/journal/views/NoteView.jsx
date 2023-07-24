import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { setActiveNote } from "../../redux/journal/journalSlice"
import { startSaveNote } from "../../redux/journal/thunks"

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote } = useSelector(state => state.journal);
    const {title, body, date, onInputChange, formState} = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    },[date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    const handleSaveNote = () => {
        dispatch(startSaveNote())
    }

    return (
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{mb: 1}}>
            <Grid item>
                <Typography fontSize={39} fontWeight={'light'}>{dateString}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={handleSaveNote} color="primary" sx={{padding: 2}}>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField name="title" value={title} onChange={onInputChange} type="text" variant="filled" fullWidth placeholder="Ingrese un titulo" label="Titulo" sx={{border: 'none', mb: 1}} />
                <TextField name="body" value={body} onChange={onInputChange} type="text" variant="filled" fullWidth multiline placeholder="¿Qué sucedio hoy?" minRows={5} sx={{border: 'none', mb: 1}} />
            </Grid>

            <ImageGallery />
        </Grid>
    )
}
