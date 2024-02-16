import React, { useState, useEffect } from 'react';
import './styles';
import {
    HomeContainer, Header, LoginButton, LogoStyle, BannerContainer, BannerImage, EventSection,
    EventTitle, EventDetails, EventLocation, TicketsContainer, Ticket,
    TicketTitle,
    TicketLot, QuantitySelect, QuantityButton, QuantityDisplay, FinalizeButton
} from './styles';
import { useTheme } from '../../components/contexts/Theme/ThemeContext';

import { useIngressosApi } from '../../hooks/ingressosApi';
import Logo from '../../assets/images/logo.png';
import Banner from '../../assets/images/banner.jpg';
import LoadingComponent from '../../components/Loading/Loading';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import Timer from '../../components/Timer/Timer';
import { useNavigate } from 'react-router-dom';
import { useCarrinhos } from '../../components/contexts/Carrinhos/CarrinhosProvider';
import { CarrinhosContext } from '../../components/contexts/Carrinhos/CarrinhosProvider';
import Sidebar from '../../components/Sidebar/Sidebar';

interface TicketData {
    ingresso_id: number;
    lote_id: number;
    ingresso_descricao: string;
    lote_descricao: string;
    lote_preco: number;
    lote_quantidade_maxima: number;
}


const Home: React.FC = () => {

    const { theme } = useTheme();

    const navigate = useNavigate();

    const ingressosApi = useIngressosApi();
    const { selectedTickets, handleQuantityChange, finalizePurchase, loading, setLoading } = useCarrinhos();
    const [tickets, setTickets] = useState<TicketData[]>([]);


    useEffect(() => {
        const fetchTickets = async () => {
            const data = await ingressosApi.getIngressos();
            setTickets(data);
        };
    
        fetchTickets();
    }, []);
    
    



    return (
        <HomeContainer theme={theme}>
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
                            <QuantityButton onClick={() => handleQuantityChange(ticket.lote_id, -1, tickets)}>-</QuantityButton>
                            <QuantityDisplay>
                                {selectedTickets.carrinho_lotes.find(lote => lote.lote_id === ticket.lote_id)?.lote_quantidade || 0}
                            </QuantityDisplay>
                            <QuantityButton onClick={() => handleQuantityChange(ticket.lote_id, 1, tickets)}>+</QuantityButton>
                        </QuantitySelect>
                    </Ticket>
                ))}
                <FinalizeButton theme={theme} onClick={finalizePurchase}>Finalizar Compra</FinalizeButton>
            </TicketsContainer>
        </HomeContainer >
    )
}

export default Home;