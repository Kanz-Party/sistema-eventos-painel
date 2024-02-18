import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { recuperarSenha } from '../../hooks/usuarioApi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/Theme/ThemeContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
    const navigate = useNavigate();
    
    const {theme} = useTheme();
    const auth = useContext(AuthContext);

    const handleLogin = async () => {
        if (email && password) {
            auth.signin(email, password).then((res) => {
                localStorage.setItem('token', res.token);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Usuário logado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/');
                });
            }).catch((error) => {
                Swal.fire({
                    title: 'Erro!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }
    };

    const handleRecoverPassword = async () => {
        if (email) {
            recuperarSenha(email).then(() => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Email enviado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/';
                });
            }).catch((error) => {
                Swal.fire({
                    title: 'Erro!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography component="h1" variant="h5">
                    {isRecoveringPassword ? 'Recuperar Senha' : 'Login'}
                </Typography>
                <Box component="form" sx={{ mt: 1, width: '100%' }} onSubmit={isRecoveringPassword ? handleRecoverPassword : handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isRecoveringPassword && (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                    {!isRecoveringPassword ? (
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: theme.colors.main,
                                fontSize: '16px',
                                width: '100%',
                                fontWeight: 'bold',
                                fontFamily: 'OpenSans',
                                '&:hover': {
                                    backgroundColor: theme.colors.main
                                },
                                '&:active': {
                                    backgroundColor: theme.colors.main
                                }
                            }}
                            onClick={
                                handleLogin
                            }
                        >
                            Logar
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: theme.colors.main,
                                fontSize: '16px',
                                width: '100%',
                                fontWeight: 'bold',
                                fontFamily: 'OpenSans',
                                '&:hover': {
                                    backgroundColor: theme.colors.main
                                },
                                '&:active': {
                                    backgroundColor: theme.colors.main
                                }
                            }}
                            onClick={
                                handleRecoverPassword
                            }
                        >
                            Recuperar Senha
                        </Button>
                    )}
                    <Button
                        type="button"
                        fullWidth
                        variant="text"
                        sx={{ 
                            mt: 1, 
                            mb: 2,
                            color: theme.colors.main
                        }}
                        onClick={() => setIsRecoveringPassword(!isRecoveringPassword)}
                    >
                        {isRecoveringPassword ? 'Voltar ao login' : 'Esqueci minha senha'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
