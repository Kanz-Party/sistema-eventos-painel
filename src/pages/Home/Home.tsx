import React, { useState, useEffect } from 'react';
import './styles';
import {
    HomeContainer, Header, LoginButton, LogoStyle, BannerContainer, BannerImage, EventSection,
    EventTitle, EventDetails, EventLocation, TicketsContainer, Ticket,
    TicketTitle, TicketPrice, TicketInfo, PromoCodeInput, SelectTicketButton,
    TicketLot, BuyButton, QuantitySelect, QuantityButton, QuantityDisplay, FinalizeButton
} from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import Typography from '@mui/material/Typography/Typography';
import { useIngressosApi } from '../../hooks/ingressosApi';
import Logo from '../../images/logo.png';
import Banner from '../../images/banner.jpg';
import LoadingComponent from '../../components/Loading/Loading';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';

interface Ticket {
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

interface HomeProps {
}

const Home: React.FC<HomeProps> = ({ }) => {

    const { theme } = useTheme();

    const ingressosApi = useIngressosApi();
    const UseCarrinhosApi = useCarrinhosApi();

    const [Loading, setLoading] = useState<boolean>(true);

    const [tickets, setTickets] = useState<Ticket[]>([]);

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

    const finalizePurchase = () => {
        const response = UseCarrinhosApi.postCarrinho(selectedTickets);
        console.log(response);

    };

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await ingressosApi.getIngressos();
            setTickets(data);
        };
        console.log(tickets);

        fetchTickets();

        setLoading(false);
    }, []);

    if (Loading) {
        return <LoadingComponent />
    }

    return (
        <HomeContainer theme={theme}>

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
                <EventTitle>RAQSA PARTY FIRST EDITION</EventTitle>
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