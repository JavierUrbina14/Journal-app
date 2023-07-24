import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../redux/journal/journalSlice";

export const SidebarItem = ({ id, title, body, date }) => {
    const dispatch = useDispatch();
    const newTitle = useMemo(() => {
        return title.length > 16
            ? title.substring(0,16) + '...'
            : title;
    }, [title])

    const HandleOpenNote = () => {
        dispatch(setActiveNote({ id, title, body, date }))
    }

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={HandleOpenNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
