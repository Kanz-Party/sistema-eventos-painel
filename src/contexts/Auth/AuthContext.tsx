import { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {

    user: any;
    signin: (email : string, password : string) => Promise<any>;
    signout: () => void;
    logado: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);