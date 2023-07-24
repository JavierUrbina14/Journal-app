import { onAuthStateChanged } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../redux/auth/authSlice"
import { useEffect } from "react"
import { FirebaseAuth } from "../firebase/config"
import { startLoadingNotes } from "../redux/journal/thunks"

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if(!user) return dispatch(logout())
            const {uid, email, displayName, photoURL} = user
            dispatch(login({uid, email, displayName, photoURL}))
            dispatch(startLoadingNotes());
        })
    }, [])
    

    return {
        status
    }
}
