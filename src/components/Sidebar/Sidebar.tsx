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
import { AuthContext } from '../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = React.useContext(AuthContext);

    console.log(auth);

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

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250 }}
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
                        <Avatar src="/path/to/your/profile/picture.jpg" />

                    </div>
                </ListItem>

                {
                    auth.logado ? (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <TicketIcon style={{ color: 'white' }} />
                                </ListItemIcon>
                                <Link to={`/ingressos`}>
                                    <ListItemText primary="Meus Ingressos" />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleIcon style={{ color: 'white' }} />
                                </ListItemIcon>
                                <Link to={'/conta'}>
                                    <ListItemText primary="Dados da Conta" />
                                </Link>
                            </ListItem>
                            <ListItem button style={
                                { justifyContent: 'center', }
                            }>
                                Sair
                            </ListItem>
                        </>
                    ) : (
                        <ListItem style={
                            { justifyContent: 'center', }
                        }>
                            <Link to={'/conta'}>
                                <Button fullWidth variant="contained" color="primary">
                                    Login
                                </Button>
                            </Link>
                        </ListItem>
                    )
                }
            </List>
        </div>
    );

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <Drawer
                anchor='right'
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
};

export default Sidebar;
