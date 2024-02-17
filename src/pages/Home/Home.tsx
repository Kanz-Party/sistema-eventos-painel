import React, { useState, useEffect, useContext } from 'react';
import './styles';
import {
    HomeContainer, Header, LoginButton, LogoStyle, BannerContainer, BannerImage, EventSection,
    EventTitle, EventDetails, EventLocation, TicketsContainer, Ticket,
    TicketTitle, EventDescription,
    TicketLot, QuantitySelect, QuantityButton, QuantityDisplay, FinalizeButton
} from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { useIngressosApi } from '../../hooks/ingressosApi';
import Banner from '../../assets/images/banner.jpg';
import { CarrinhoContext } from '../../contexts/Carrinho/CarrinhoContext';
import { Button } from '@mui/material';




const Home: React.FC = () => {

    const { theme } = useTheme();

    const ingressosApi = useIngressosApi();
    const {setTickets, tickets, handleQuantityChange, criarCarrinho, selectedTickets, loading, setLoading} = useContext(CarrinhoContext);

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
            <EventDescription theme={theme}>
                <h2>O SHOW</h2>
                <p>🌟 Preparados para uma noite inesquecível de música eletrônica? 🌌 Apresentamos a First Edition da Kanz Party, uma celebração épica que vai ficar na memória!</p>
                <p>🎧 B2B Set com DJ Allan & DJ Reborn – A lendária dupla de óculos escuros está pronta para incendiar a pista, compartilhando a mesma mesa de mixagem e prometendo uma abertura explosiva que vai levantar todo mundo!</p>
                <p>🎵 DJ Ellie Santos – A magia continua com a residente da renomada Opium Club. Ellie Santos traz seu set vibrante e cheio de energia, pronta para mostrar a verdadeira essência da música eletrônica! 🚀 Prepare-se para ser transportado a outra dimensão.</p>
                <p>🎩 Nando M – E para garantir que a noite seja verdadeiramente inesquecível, Nando M entra em cena para fechar com chave de ouro. Com beats que prometem fazer a casa tremer, ele vai manter a energia no máximo até o amanhecer! ☀</p>
                <p>Não perca a oportunidade de ser parte da história na First Edition da Kanz Party. Venha viver uma noite de pura euforia e música eletrônica de qualidade, onde cada momento promete ser mais eletrizante que o anterior. Marque na agenda, convide os amigos e prepare-se para uma experiência única! 🎉</p>
            </EventDescription>
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
                {loading ? (
                    <Button variant='contained' disabled>Carregando...</Button>
                ) : (
                    <Button variant='contained' onClick={criarCarrinho}>Finalizar Compra</Button>
                )}
            </TicketsContainer>
        </HomeContainer >
    )
}

export default Home;