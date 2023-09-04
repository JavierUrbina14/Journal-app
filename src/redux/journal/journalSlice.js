import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
        // activeNote: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: [],
        // }
    },
    reducers: {
        creatingNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state , action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
            state.messageSaved = `${action.payload.title} actualizada correctamente!`
        },
        setPhotosToActiveNote: (state, action) => {
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ]; 
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        
        deleteNoteById: (state, action) => {
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
    },
});


export const { 
    creatingNote, 
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote, 
    deleteNoteById, 
    setPhotosToActiveNote,
    clearNotesLogout
} = journalSlice.actions;