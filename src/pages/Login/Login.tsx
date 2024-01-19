import React, { useContext, useState } from 'react';
import './styles';
import { LoginContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';

interface loginProps {
}

const login: React.FC<loginProps> = ({}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email && password) {
            const isLogged = await auth.signin(email, password);

            if(isLogged) {
                navigate('/')
            } else {
                alert('Usuário ou senha inválidos');
            }
        }
    }

    return (
        <LoginContainer>
            <h1>Login</h1>

            <input type="text" value={email} placeholder="Digite seu email" onChange={(e) => {
                setEmail(e.target.value);
            }} />
            <input type="password" value={password} placeholder="Digite sua senha" onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <button onClick={handleLogin}>Logar</button>
        </LoginContainer>
    );
}

export default login;