import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from '../../pages/Login/Login';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

    const auth = useContext(AuthContext);

    if (!auth.logado) {
        return <Login />
    }

    return (
        <>
            {children}
        </>
    );
}