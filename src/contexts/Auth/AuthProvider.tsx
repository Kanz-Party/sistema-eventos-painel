import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(() => {

        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const data = await api.validateToken(token);

                if (data.user) {
                    setUser(data.user);
                }
            }


        }

        validateToken();
    }, []);


    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        window.location.href = window.location.href;

        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }

        return false;
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
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}