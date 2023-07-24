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
        //     imageURLS: [],
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
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
        },
        deleteNoteById: (state, action) => {

        },
    },
});


export const { creatingNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;