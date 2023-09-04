import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../redux/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../redux/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);
    const { title, body, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const handleSaveNote = () => {
        dispatch(startSaveNote())
    }

    const handleFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const handleDeleteNote = () => {
        dispatch(startDeletingNote())
    }

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [messageSaved])



    return (
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight={'light'}>{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>
                <Button disabled={isSaving} onClick={handleSaveNote} color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField name="title" value={title} onChange={onInputChange} type="text" variant="filled" fullWidth placeholder="Ingrese un titulo" label="Titulo" sx={{ border: 'none', mb: 1 }} />
                <TextField name="body" value={body} onChange={onInputChange} type="text" variant="filled" fullWidth multiline placeholder="¿Qué sucedio hoy?" minRows={5} sx={{ border: 'none', mb: 1 }} />
            </Grid>
            <Grid container justifyContent={"end"}>
                <Button onClick={handleDeleteNote} sx={{mt:2}} color="error">
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={activeNote.imageUrls} />
        </Grid>
    )
}
