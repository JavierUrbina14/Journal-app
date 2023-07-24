import { Box, Toolbar } from "@mui/material"
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        <Box className="animate__animated animate__fadeIn animate__faster" sx={{display: 'flex'}}>

            {/* Navbar */}
            <Navbar drawerWidth={drawerWidth} />

            {/* SideBar */}
            <Sidebar drawerWidth={drawerWidth} />

            <Box component={'main'} sx={{flexGrow: 1, p: 3}}>
                <Toolbar />
                { children }
            </Box>

        </Box>
    )
}
