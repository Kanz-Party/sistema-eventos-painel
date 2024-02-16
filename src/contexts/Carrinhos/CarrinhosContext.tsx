import { createContext } from "react";

export type CarrinhosContextType = {
    carrinho: any;
    setCarrinho: (carrinho: any) => void;
}

export const CarrinhosContext = createContext<CarrinhosContextType>(null!);


