import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';

export const Private = () => {

    const auth = useContext(AuthContext);

    return (
        <div>
            <h1>Private</h1>

            <p>Olá {auth.user?.name}</p>
        </div>
    );
};