import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom"; // Supondo o uso do react-router para navegação

// Definindo os tipos
interface TicketData {
    ingresso_id: number;
    lote_id: number;
    ingresso_descricao: string;
    lote_descricao: string;
    lote_preco: number;
    lote_quantidade_maxima: number;
}

interface SelectedTicket {
    lote_id: number;
    lote_quantidade: number;
}

interface SelectedTickets {
    carrinho_lotes: SelectedTicket[];
}

interface CarrinhosContextType {
    selectedTickets: SelectedTickets;
    handleQuantityChange: (loteId: number, change: number, tickets: TicketData[]) => void;
    finalizePurchase: () => Promise<void>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Criando o contexto com um valor padrão
export const CarrinhosContext = createContext<CarrinhosContextType | undefined>(undefined);

export const CarrinhosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({ carrinho_lotes: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const navigate = useNavigate();

    // Exemplo de uma API fictícia para ilustrar
    const UseCarrinhosApi = {
        postCarrinho: async (selectedTickets: SelectedTickets) => {
            // Implemente sua lógica de API aqui
            return { carrinho_hash: "hash_example" }; // Mock da resposta
        },
    };

    const handleQuantityChange = useCallback((loteId: number, change: number, tickets: TicketData[]) => {
        setSelectedTickets((prev) => {
            const ticketIndex = tickets.findIndex((ticket) => ticket.lote_id === loteId);
            if (ticketIndex === -1) return prev; // Ticket não encontrado

            const existingTicketIndex = prev.carrinho_lotes.findIndex((lote) => lote.lote_id === loteId);
            let newQuantity = change;

            if (existingTicketIndex !== -1) {
                newQuantity = prev.carrinho_lotes[existingTicketIndex].lote_quantidade + change;
                newQuantity = Math.max(0, Math.min(newQuantity, tickets[ticketIndex].lote_quantidade_maxima));
            }

            if (newQuantity <= 0) {
                return {
                    ...prev,
                    carrinho_lotes: prev.carrinho_lotes.filter((lote) => lote.lote_id !== loteId),
                };
            } else {
                let newCarrinhoLotes = [...prev.carrinho_lotes];
                if (existingTicketIndex !== -1) {
                    newCarrinhoLotes[existingTicketIndex] = { ...newCarrinhoLotes[existingTicketIndex], lote_quantidade: newQuantity };
                } else {
                    newCarrinhoLotes.push({ lote_id: loteId, lote_quantidade: newQuantity });
                }
                return { ...prev, carrinho_lotes: newCarrinhoLotes };
            }
        });
    }, []);

    const finalizePurchase = useCallback(async () => {
        setLoading(true);
        const response = await UseCarrinhosApi.postCarrinho(selectedTickets);
        localStorage.setItem("carrinho", response.carrinho_hash);
        setLoading(false);
        navigate("/finalizar");
    }, [selectedTickets, navigate]);

    return (
        <CarrinhosContext.Provider value={{ selectedTickets, handleQuantityChange, finalizePurchase, loading, setLoading }}>
            {children}
        </CarrinhosContext.Provider>
    );
};

// Hook para facilitar o uso do contexto
export const useCarrinhos = (): CarrinhosContextType => {
    const context = useContext(CarrinhosContext);
    if (!context) {
        throw new Error("useCarrinhos must be used within a CarrinhosProvider");
    }
    return context;
};
