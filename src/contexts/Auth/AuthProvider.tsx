import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { set } from "react-hook-form";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<any>(null);
    const [logado, setLogado] = useState<boolean>(false);
    const api = useApi();

    useEffect(() => {

        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const data = await api.validateToken(token);
                if (data.estaLogado) {
                    setLogado(true);
                }
            }
        }

        validateToken();
    }, [api]);
    


    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        setUser(data.usuario);
        return data;
    }

    const signout = async () => {
        const data = await api.logout();

        if (data.status) {
            setUser(null);
            setToken('');
        }

        return false;
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