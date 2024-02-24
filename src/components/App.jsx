import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    MenuItem,
    Divider,
    Menu,
    ListItemIcon,
    Box,
    Tooltip, IconButton, Avatar, Modal, Container
} from "@mui/material";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { AppProvider, useApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import "./App.css";
import * as React from 'react'
import { PersonRemove, Logout } from "@mui/icons-material";

const appId = "application-0-ctauu";

//FEATURE Enter Keywords
//FEATURE Select Tags from Legend
//FEATURE Suggestions?


export default function ProvidedApp() {
    return (
        <ThemeProvider>
            <AppProvider appId={appId}>
                <App/>
            </AppProvider>
        </ThemeProvider>
    );
}

function App() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [mOpen, setMOpen] = React.useState(false);
    const {currentUser, logOut, deleteAccount} = useApp();

    const handlemClose = () => {
        setMOpen(false);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logOut();
    }

    const handleDeleteAccount = async () => {
        handleClose();

        await deleteAccount();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
        p: 3,
    };


    return (
        <div className="App">
            <AppBar position="sticky">
                <Modal
                    open={mOpen}
                    onClose={handlemClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete your account?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 1}}>
                            You can also unsubscribe to stop receiving emails.
                        </Typography>
                        <div style={{marginTop: 40}}>
                            <Button sx={{mr: 3}} onClick={() => {
                                setMOpen(false);
                                handleDeleteAccount()
                            }} variant="contained">Yes, delete my account</Button>
                            <Button onClick={() => setMOpen(false)} variant="outlined">Cancel</Button>
                        </div>

                    </Box>
                </Modal>
                <Toolbar>
                    <AppName/>
                    {currentUser ? (
                        <div>
                            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                <a target="_blank" style={{textDecoration: "none", color: 'white'}} href='https://hospitality.usc.edu/residential-dining-menus/'><Typography
                                    sx={{minWidth: 100}}>Menus</Typography></a>
                                <a style={{textDecoration: "none", color: 'white'}} href='mailto:scbitesinfo@gmail.com'><Typography
                                    sx={{minWidth: 100}}>Contact</Typography></a>
                                <Tooltip title="Account">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ml: 2}}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{width: 32, height: 32}}></Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Log out
                                </MenuItem>

                                <Divider/>
                                <MenuItem onClick={() => setMOpen(true)}>
                                    <ListItemIcon>
                                        <PersonRemove fontSize="small"/>
                                    </ListItemIcon>
                                    Delete Account
                                </MenuItem>

                            </Menu>
                        </div>
                    ) : null}
                </Toolbar>
            </AppBar>
            {currentUser ? <HomePage/> : <LoginPage/>}
        </div>
    );
}
