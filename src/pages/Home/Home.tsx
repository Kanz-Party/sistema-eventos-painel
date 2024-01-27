<<<<<<< Updated upstream
import React, { useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> Stashed changes
import './styles';
import {
    HomeContainer, Header, LoginButton, LogoStyle, BannerContainer, BannerImage, EventSection,
    EventTitle, EventDetails, EventLocation, TicketsContainer, Ticket,
    TicketTitle, TicketPrice, TicketInfo, PromoCodeInput, SelectTicketButton,
    TicketLot, BuyButton, QuantitySelect, QuantityButton, QuantityDisplay, FinalizeButton
} from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
<<<<<<< Updated upstream
import Typography from '@mui/material/Typography/Typography';
import { useIngressosApi } from '../../hooks/ingressosApi';
=======
import Logo from '../../images/logo.png';
import Banner from '../../images/banner.jpg';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const ingressosApi = useIngressosApi();
=======
    const { theme } = useTheme();
>>>>>>> Stashed changes

    const tickets = [
        {
            "ingresso_id": 1,
            "ingresso_descricao": "Pista (Masculino)",
            "lote_id": 1,
            "lote_descricao": "Lote Promocional",
            "lote_preco": "25.00",
            "lote_quantidade_maxima": 3
        },
        {
            "ingresso_id": 2,
            "ingresso_descricao": "Pista (Feminino)",
            "lote_id": 2,
            "lote_descricao": "Lote Promocional",
            "lote_preco": "25.00",
            "lote_quantidade_maxima": 3
        }
    ]

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
        ingressosApi.getIngressos();
    }, []);

    return (
<<<<<<< Updated upstream
        <HomeContainer  theme={theme}>
            
=======
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
                <EventLocation>Evento presencial em Trip bar, Guaporé - RS</EventLocation>
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
>>>>>>> Stashed changes
        </HomeContainer >
    )
}

export default Home;