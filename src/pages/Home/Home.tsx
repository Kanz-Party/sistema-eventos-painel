import React, { useState, useEffect, useContext } from 'react';
import './styles';
import {
    HomeContainer, BackgroundVideoContainer, BannerContainer, BannerImage, EventSection,
    EventTitle, EventDetails, EventLocation, TicketsContainer, Ticket,
    TicketTitle, EventDescription,
    TicketLot, QuantitySelect, QuantityButton, QuantityDisplay
} from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { useIngressosApi } from '../../hooks/ingressosApi';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import { CarrinhoContext } from '../../contexts/Carrinho/CarrinhoContext';
import { Button, colors } from '@mui/material';
import Banner from '../../assets/images/banner.jpg';
import videoSource from './party.mp4';




const Home: React.FC = () => {

    const { theme } = useTheme();

    const ingressosApi = useIngressosApi();
    const { setTickets, tickets, handleQuantityChange, criarCarrinho, selectedTickets, loading, setLoading } = useContext(CarrinhoContext);

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await ingressosApi.getIngressos();
            setTickets(data);
        };

        fetchTickets();
    }, []);

    return (
        <HomeContainer theme={theme}>
            {/* <BackgroundVideoContainer>
                <video autoPlay loop muted>
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </BackgroundVideoContainer> */}
            <BannerContainer background={Banner} theme={theme}>
                <BannerImage theme={theme} src={Banner} alt="Banner" />
            </BannerContainer>
            <EventSection theme={theme}>
                <EventTitle theme={theme}><span>Kanz Party</span> FIRST EDITION</EventTitle>
                <EventDetails theme={theme}>09 mar - 2024 • 23:30 </EventDetails>
                <EventLocation theme={theme}>Evento presencial em Trip Bar, Guaporé - RS</EventLocation>
            </EventSection>
            <TicketsContainer theme={theme}>
                {tickets.map(ticket => (
                    <Ticket theme={theme} key={ticket.ingresso_id}>
                        <TicketTitle theme={theme}>{ticket.ingresso_descricao}</TicketTitle>
                        <TicketLot theme={theme}>{ticket.lote_descricao} - <span>R$&nbsp;{ticket.lote_preco.toString().replace('.', ',')}</span></TicketLot>
                        <QuantitySelect theme={theme}>
                            <QuantityButton theme={theme} onClick={() => handleQuantityChange(ticket.lote_id, -1, tickets)}>-</QuantityButton>
                            <QuantityDisplay theme={theme}>
                                {selectedTickets.carrinho_lotes.find(lote => lote.lote_id === ticket.lote_id)?.lote_quantidade || 0}
                            </QuantityDisplay>
                            <QuantityButton theme={theme} onClick={() => handleQuantityChange(ticket.lote_id, 1, tickets)}>+</QuantityButton>
                        </QuantitySelect>
                    </Ticket>
                ))}
                {loading ? (
                    <Button variant='contained' disabled>Carregando...</Button>
                ) : (
                    <Button
                        sx={{
                            backgroundColor: theme.colors.main,
                            fontSize: '16px',
                            width: '100%',
                            fontWeight: 'bold',
                            fontFamily: 'OpenSans',
                            '&:hover': {
                                backgroundColor: theme.colors.main
                            },
                            '&:active': {
                                backgroundColor: theme.colors.main
                            }
                        }}
                        endIcon={<TicketIcon style={{ color: theme.colors.white }} />}
                        variant='contained' 
                        onClick={criarCarrinho}>
                        Comprar Ingressos
                    </Button>
                )}
            </TicketsContainer>
            <EventDescription theme={theme}>
                <h2>O SHOW</h2>
                <p>🌟 Preparados para uma noite inesquecível de música eletrônica? 🌌 Apresentamos a First Edition da Kanz Party, uma celebração épica que vai ficar na memória!</p>
                <p>🎧 B2B Set com DJ Allan & DJ Reborn – A lendária dupla de óculos escuros está pronta para incendiar a pista, compartilhando a mesma mesa de mixagem e prometendo uma abertura explosiva que vai levantar todo mundo!</p>
                <p>🎵 DJ Ellie Santos – A magia continua com a residente da renomada Opium Club. Ellie Santos traz seu set vibrante e cheio de energia, pronta para mostrar a verdadeira essência da música eletrônica! 🚀 Prepare-se para ser transportado a outra dimensão.</p>
                <p>🎩 Nando M – E para garantir que a noite seja verdadeiramente inesquecível, Nando M entra em cena para fechar com chave de ouro. Com beats que prometem fazer a casa tremer, ele vai manter a energia no máximo até o amanhecer! ☀</p>
                <p>Não perca a oportunidade de ser parte da história na First Edition da Kanz Party. Venha viver uma noite de pura euforia e música eletrônica de qualidade, onde cada momento promete ser mais eletrizante que o anterior. Marque na agenda, convide os amigos e prepare-se para uma experiência única! 🎉</p>
            </EventDescription>
            

        </HomeContainer >
    )
}

export default Home;