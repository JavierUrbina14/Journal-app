import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, creatingNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
        title: "",
        body: "",
        date: new Date().getTime(),
        };

        try {
            dispatch(creatingNote());
            const docRef = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`),newNote);
            newNote.id = docRef.id;
            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));
        } catch (error) {
            console.log(error);
        }
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });
        dispatch(updateNote(activeNote))
    }
}