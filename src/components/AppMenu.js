import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import * as React from "react";
import {useAuth} from "../hooks/useAuth";
import {MODALS, useModals} from "../hooks/useModal";

export default function AppMenu() {
    const navigate = useNavigate();
    const {authToken, logout} = useAuth();
    const {showModal} = useModals();
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} onClick={() => {
                        navigate("/");
                    }}>
                        Wallet
                    </Typography>
                    {authToken === false && (<>
                        <Button color="inherit" onClick={() => {
                            showModal(MODALS.LOGIN);
                        }}>Login</Button>
                        <Button color="inherit" onClick={() => {
                            showModal(MODALS.REG);
                        }}>Reg</Button>
                    </>)}
                    {authToken !== false && (<>
                        <Button color="inherit" onClick={() => {
                            navigate("/");
                        }}>My Wallet</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
