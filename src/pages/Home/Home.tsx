import React, { useState, useEffect } from 'react';
import './styles';
import {
    HomeContainer, Header, LoginButton, LogoStyle, BannerContainer, BannerImage, EventSection,
    EventTitle, EventDetails, EventLocation, TicketsContainer, Ticket,
    TicketTitle,
    TicketLot, QuantitySelect, QuantityButton, QuantityDisplay, FinalizeButton
} from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';

import { useIngressosApi } from '../../hooks/ingressosApi';
import Logo from '../../images/logo.png';
import Banner from '../../images/banner.jpg';
import LoadingComponent from '../../components/Loading/Loading';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import Timer from '../../components/Timer/Timer';
import { useNavigate } from 'react-router-dom';

interface TicketData {
    ingresso_id: number;
    ingresso_descricao: string;
    lote_descricao: string;
    lote_preco: string;
    lote_quantidade_maxima: number;
    lote_id: number;
}

interface LoteCarrinho {
    lote_id: number;
    lote_quantidade: number;
}

interface SelectedTickets {
    carrinho_lotes: LoteCarrinho[]; 
}


const Home: React.FC = () => {

    const { theme } = useTheme();

    const navigate = useNavigate();

    const ingressosApi = useIngressosApi();
    const UseCarrinhosApi = useCarrinhosApi();

    const [timerLimit, setTimerLimit] = useState<any>();
    const [timer, setTimer] = useState<any>();

    const [Loading, setLoading] = useState<boolean>(false);

    const [tickets, setTickets] = useState<TicketData[]>([]);

    const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({ carrinho_lotes: [] });

    const handleQuantityChange = (loteId: number, change: number) => {
        // Encontrar o ticket correspondente ao lote_id
        const ticket = tickets.find(ticket => ticket.lote_id === loteId);

        if (!ticket) {
            return;
        }

        setSelectedTickets(prev => {
            const existingLote = prev.carrinho_lotes.find(lote => lote.lote_id === loteId);
            let newQuantity = (existingLote?.lote_quantidade || 0) + change;

            // Condição para garantir que a quantidade não seja negativa ou exceda o máximo
            newQuantity = Math.max(0, Math.min(newQuantity, ticket.lote_quantidade_maxima));

            // Se não mudou, retorna o prev para evitar re-renderizações desnecessárias
            if (newQuantity === (existingLote?.lote_quantidade || 0)) {
                return prev;
            }

            const updatedLotes = existingLote
                ? prev.carrinho_lotes.map(lote =>
                    lote.lote_id === loteId ? { ...lote, lote_quantidade: newQuantity } : lote)
                : [...prev.carrinho_lotes, { lote_id: loteId, lote_quantidade: newQuantity }];

            return { carrinho_lotes: updatedLotes };
        });
    };

    const finalizePurchase = async () => {
        const response = await UseCarrinhosApi.postCarrinho(selectedTickets) as any;
        localStorage.setItem('carrinho', response.carrinho_hash);

        navigate('/finalizar');

    };
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true); // Set loading to true before fetching data
    
            const data = await ingressosApi.getIngressos();
            setTickets(data);
    
            const getCarrinhoStorage = localStorage.getItem('carrinho');
    
            if (getCarrinhoStorage) {

                setLoading(false);
                const carrinho = await UseCarrinhosApi.getCarrinho(getCarrinhoStorage);
    
                const { carrinho_lotes } = carrinho;
    
                const carrinhoLotes = carrinho_lotes.map((carrinhoLote: any) => {
                    const ticket = data.find((ticket: any) => ticket.lote_id === carrinhoLote.lote_id);
                    return {
                        ...ticket,
                        lote_quantidade: carrinhoLote.lote_quantidade
                    };
                });
    
                setTimerLimit(carrinho.carrinho_expiracao);
                setTimer(carrinho.data_atual);
                setSelectedTickets({ carrinho_lotes: carrinhoLotes });
            }else{
                setLoading(false);
            }

        };
    
        fetchTickets();
    
        // No dependencies in the dependency array to prevent infinite loop
    }, []);
    
    

    if (Loading) {
        return <LoadingComponent />
    }

    return (
        <HomeContainer theme={theme}>
         {
            timerLimit && timer ? <Timer expirationDate={timerLimit}  /> : null
         }

            <Header>
                <div></div> {/* Espaço vazio para manter o logo centralizado */}
                <div className="logo">
                    <LogoStyle src={Logo} alt="Logo" />
                </div>
                <div className="login-button">
                    <LoginButton>Login</LoginButton>
                </div>
            </Header>
            <BannerContainer background={Banner}>
                <BannerImage src={Banner} alt="Banner" />
            </BannerContainer>
            <EventSection>
                <EventTitle>Kanz PARTY FIRST EDITION</EventTitle>
                <EventDetails>09 mar - 2024 • 23:30 </EventDetails>
                <EventLocation>Evento presencial em Trip Bar, Guaporé - RS</EventLocation>
            </EventSection>
            <TicketsContainer>
                {tickets.map(ticket => (
                    <Ticket key={ticket.ingresso_id}>
                        <TicketTitle>{ticket.ingresso_descricao}</TicketTitle>
                        <TicketLot>{ticket.lote_descricao} - R$ {ticket.lote_preco}</TicketLot>
                        <QuantitySelect>
                            <QuantityButton onClick={() => handleQuantityChange(ticket.lote_id, -1)}>-</QuantityButton>
                            <QuantityDisplay>
                                {selectedTickets.carrinho_lotes.find(lote => lote.lote_id === ticket.lote_id)?.lote_quantidade || 0}
                            </QuantityDisplay>
                            <QuantityButton onClick={() => handleQuantityChange(ticket.lote_id, 1)}>+</QuantityButton>
                        </QuantitySelect>
                    </Ticket>
                ))}
                <FinalizeButton theme={theme} onClick={finalizePurchase}>Finalizar Compra</FinalizeButton>
            </TicketsContainer>
        </HomeContainer >
    )
}

export default Home;