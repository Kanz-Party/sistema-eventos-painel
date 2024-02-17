import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { set } from "react-hook-form";
import { useLocation } from "react-router-dom";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<any>(null);
    const [logado, setLogado] = useState<boolean>(false);
    const api = useApi();
    const location = useLocation();

    useEffect(() => {
    
        const validateToken = async () => {
            const token = localStorage.getItem('token');
    
            if (token) {
                const data = await api.validateToken(token);
                if (data.estaLogado) {
                    setUser(data.usuario);
                    setLogado(true);
                }
                else {
                    setUser(null);
                    setLogado(false);
                }
            }
        }
    
        validateToken();
    }, [location]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        setUser(data.usuario);
        setToken(data.token);
        return data;
    }

    const signout = async () => {
        setUser(null);
        localStorage.removeItem('token');

        window.location.href = '/';
    }

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout, logado }}>
            {children}
        </AuthContext.Provider>
    );
}