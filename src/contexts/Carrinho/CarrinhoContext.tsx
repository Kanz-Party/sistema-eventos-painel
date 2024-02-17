import { createContext } from "react";
import { SelectedTickets, TicketData } from "../../types/Carrinho";

export type CarrinhoContextType = {
    selectedTickets: SelectedTickets;
    setSelectedTickets: (tickets: SelectedTickets) => void;
    tickets: TicketData[];
    setTickets: (tickets: TicketData[]) => void;
    handleQuantityChange: (loteId: number, change: number, tickets: TicketData[]) => void;
    criarCarrinho: () => void;
    loading: boolean;
    setLoading : (loading: boolean) => void;
};

export const CarrinhoContext = createContext<CarrinhoContextType>(null!);
