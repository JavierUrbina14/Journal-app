import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../redux/auth/thunks"

export const Navbar = ({drawerWidth}) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout())
    }
    return (
        <AppBar position='fixed' sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
        }}>
            <Toolbar>
                <IconButton color="inherit" edge="start" sx={{mr: 2, display: {sm: 'none'}}}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                    <Typography variant="h6" noWrap component={'div'}>Journal App</Typography>
                    <IconButton color='error' onClick={handleLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


