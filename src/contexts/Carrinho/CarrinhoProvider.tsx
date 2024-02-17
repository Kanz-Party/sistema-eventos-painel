
import { useNavigate } from "react-router-dom";
import { CarrinhoContext } from "./CarrinhoContext";
import { useIngressosApi } from "../../hooks/ingressosApi";
import { useCarrinhosApi } from "../../hooks/carrinhosApi";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { SelectedTickets, TicketData } from "../../types/Carrinho";
import Swal from "sweetalert2";

interface CarrinhoProviderProps {
  children: JSX.Element;
}



export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({
  children,
}) => {

    const navigate = useNavigate();

    const carrinhosApi = useCarrinhosApi();

    const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({ carrinho_lotes: [] });
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useContext(AuthContext);

    const criarCarrinho = async () => {
        console.log(auth.logado)
        if (!auth.logado) {
            navigate('/cadastro');
            return;
        }
        
        setLoading(true);
        let carrinho;
        try {
            carrinho = await carrinhosApi.postCarrinho(selectedTickets);
        } catch (error: any) {
            if (error.response.data.err) {
                let mensagem = "Erro ao criar carrinho";
                switch (error.response.data.err) {
                    case 'USUARIO_NAO_INFORMADO':
                        mensagem = "Usuário não informado";
                        break;
                    case 'LOTES_NAO_INFORMADOS':
                        mensagem = "Lotes não informados";
                        break;
                    case 'QUANTIDADE_INDISPONIVEL':
                        mensagem = "Quantidade indisponível para algum dos lotes, tente novamente!";
                        break;
                    case 'QUANTIDADE_MAXIMA_EXCEDIDA':
                        mensagem = "Algum lote já não possui mais ingressos disponíveis, tente novamente!";
                        break;
                    case 'LOTE_FORA_DA_VENDA':
                        mensagem = "Algum lote não está mais disponível para venda, tente novamente!";
                        break;
                    default:
                        break;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao criar carrinho',
                    text: mensagem,
                    confirmButtonText: 'Atualizar Página'
                }).then(() => {
                    window.location.href = '/';
                });
            }
        }
        setLoading(false);
        navigate(`/finalizar/${carrinho.carrinho_hash}`);
    }

    const handleQuantityChange = (loteId: number, change: number, tickets: TicketData[]) => {
        setSelectedTickets((prev) => {
            const ticketIndex = tickets.findIndex((ticket) => ticket.lote_id === loteId);
            if (ticketIndex === -1) return prev; // Ticket não encontrado

            const existingTicketIndex = prev.carrinho_lotes.findIndex((lote) => lote.lote_id === loteId);
            let newQuantity = change;

            if (existingTicketIndex !== -1) {
                newQuantity = prev.carrinho_lotes[existingTicketIndex].lote_quantidade + change;
                newQuantity = Math.max(0, Math.min(newQuantity, tickets[ticketIndex].lote_quantidade_maxima+1));
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
    };

    return (
        <CarrinhoContext.Provider
        value={{
            selectedTickets,
            setSelectedTickets,
            tickets,
            setTickets,
            handleQuantityChange,
            criarCarrinho,
            loading,
            setLoading
        }}
        >
        {children}
        </CarrinhoContext.Provider>
    );
};
