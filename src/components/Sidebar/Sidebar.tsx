import * as React from 'react';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = React.useContext(AuthContext);



    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setIsOpen(open);
    };


    const signOut = () => {
        auth.signout();
    };

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250, backgroundColor: 'black', display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <List>
                <ListItem style={{
                    justifyContent: 'center',
                }}>
                    <div style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }

                    }>
                        <Link to={'/conta'}>
                            <Avatar src="/path/to/your/profile/picture.jpg" style={
                                {
                                    color: '#f0ce8c',
                                }

                            } />
                        </Link>

                    </div>
                </ListItem>

                {
                    auth.logado ? (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <TicketIcon style={{ color: '#f0ce8c' }} />
                                </ListItemIcon>
                                <Link to={`/ingressos`} style={
                                    {
                                        color: 'white',
                                        textDecoration: 'none'
                                    }
                                }>
                                    <ListItemText primary="Meus Ingressos" />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleIcon style={{ color: '#f0ce8c' }} />
                                </ListItemIcon>
                                <Link to={'/conta'} style={
                                    {
                                        color: 'white',
                                        textDecoration: 'none'
                                    }
                                }>
                                    <ListItemText primary="Dados da Conta" />
                                </Link>
                            </ListItem>

                        </>
                    ) : (
                        <ListItem style={
                            { justifyContent: 'center', }
                        }>
                            <Link to={'/conta'}>
                                <Button fullWidth variant="contained" color="primary" style={
                                    {
                                        color: 'black',
                                        textDecoration: 'none',
                                        backgroundColor: '#f0ce8c',
                                    }
                                
                                }>
                                    Login
                                </Button>
                            </Link>
                        </ListItem>
                    )
                }
            </List>
            <div style={{ flexGrow: 1 }}></div> {/* Espaço flexível para empurrar o item "Sair" para baixo */}
            <Divider /> {/* Opcional: Adiciona um divisor antes do item "Sair" */}
            <List>
                {auth.logado ? (
                    <ListItem button onClick={() => signOut()} style={{ justifyContent: 'center', color: 'white' }}>
                        Sair
                    </ListItem>
                ) : (
                    <ListItem style={{ justifyContent: 'center' }}>
                        {/* Seu botão de login aqui */}
                    </ListItem>
                )}
            </List>
        </div>
    );

    return (
        <div >
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <Drawer
                anchor='right'
                open={isOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'black', // This targets the internal Paper component
                        width: 250 // You can also set the width here
                    }
                }}
            >
                {list()}
            </Drawer>
        </div>
    );
};

export default Sidebar;
