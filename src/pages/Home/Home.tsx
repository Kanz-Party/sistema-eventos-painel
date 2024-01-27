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

interface Ticket {
    ingresso_id: number;
    ingresso_descricao: string;
    lote_descricao: string;
    lote_preco: string;
    lote_quantidade_maxima: number;
}

type SelectedTickets = { [key: number]: number };

interface HomeProps {
}

const Home: React.FC<HomeProps> = ({ }) => {

    const theme = useTheme();

    const ingressosApi = useIngressosApi();

    const [Loading, setLoading] = useState<boolean>(true);

    const [tickets, setTickets] = useState<Ticket[]>([]);

    const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({});

    const handleQuantityChange = (ticketId: number, change: number) => {

        const ticket = tickets.find(ticket => ticket.ingresso_id === ticketId);

        if (!ticket) {
            return;
        }

        if (selectedTickets[ticketId] + change > ticket.lote_quantidade_maxima) {
            return;
        }

        setSelectedTickets(prev => ({
            ...prev,
            [ticketId]: Math.max(0, (prev[ticketId] || 0) + change)
        }));
    };

    const finalizePurchase = () => {
        console.log("Ingressos comprados:", selectedTickets);
        // Aqui você pode adicionar lógica adicional para finalizar a compra
    };

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await ingressosApi.getIngressos();
            setTickets(data);
        };

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
                            <QuantityButton onClick={() => handleQuantityChange(ticket.ingresso_id, -1)}>-</QuantityButton>
                            <QuantityDisplay>{selectedTickets[ticket.ingresso_id] || 0}</QuantityDisplay>
                            <QuantityButton onClick={() => handleQuantityChange(ticket.ingresso_id, 1)}>+</QuantityButton>
                        </QuantitySelect>
                    </Ticket>
                ))}
                <FinalizeButton onClick={finalizePurchase}>Finalizar Compra</FinalizeButton>
            </TicketsContainer>
        </HomeContainer >
    )
}

export default Home;