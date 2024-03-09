import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { useLocation, useParams } from 'react-router-dom';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import { Button, Modal, Box, IconButton } from '@mui/material'; // Importe o Modal do Material-UI
import { Close } from '@mui/icons-material'; // Importe o ícone de fechar do Material-UI
import { BannerContainer } from '../Home/styles';
import { BannerImage } from '../Home/styles';
import { Center } from '../Ingressos/styles';
import Banner from '../../assets/images/banner.jpg';
import QRCode from 'qrcode.react';
import { z } from 'zod';

const Ingresso: React.FC = () => {
    const { carrinho_hash } = useParams();
    const carrinhosApi = useCarrinhosApi();
    const [ingresso, setIngresso] = useState<any>({});
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura e o fechamento do modal

    useEffect(() => {
        const init = async () => {
            const carrinho = await carrinhosApi.getMeusQrCodes(carrinho_hash);
            setIngresso(carrinho[0]);
        };
        init();
    }, [carrinho_hash]);

    // Função para abrir o modal
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Container>
                <div className="ingresso-container">
                    <div className="ingresso-qrcode" onClick={handleOpenModal}>
                        {modalOpen ? ( // Verifica se o modal está aberto para aplicar os estilos
                            <QRCode value={ingresso.qrcode_hash} style={{ width: '80%', maxHeight: '80%' }} />
                        ) : (
                            <QRCode value={ingresso.qrcode_hash} style={
                                {
                                    zIndex: 1,
                                }
                            }/>
                        )}
                    </div>
                    <div className="ingresso-header">
                        <h2>Detalhes do Ingresso</h2>
                    </div>
                    <div className="ingresso-info">
                        <p><span>Lote:</span> {ingresso.lote_descricao}</p>
                        <p><span>Tipo de Ingresso:</span> {ingresso.ingresso_descricao}</p>
                        <p><span>Data de Entrada:</span> 09/03/2024</p>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ color: 'black', textDecoration: 'none', backgroundColor: '#f0ce8c', width: '50%' }}
                        onClick={handleOpenModal} // Abrir o modal ao clicar no botão
                    >
                        Ver Ingresso
                    </Button>
                </div>
            </Container>
            {/* Modal para exibir o QR code */}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%', // 50% da largura da tela
                        height: '70vh', // 70% da altura da tela
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fundo branco com transparência
                        borderRadius: '8px',
                        padding: '20px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        '@media (max-width: 768px)': { // Estilos para dispositivos com largura de tela até 768px (tablet e mobile)
                            width: '70%', // 70% da largura da tela
                        },
                    }}
                >
                    <QRCode value={ingresso.qrcode_hash} style={{ width: '80%', maxHeight: '80%', height: 'auto' }} /> {/* Ajuste para ocupar 80% do modal */}
                    <IconButton
                        sx={{ position: 'absolute', top: '10px', right: '10px', color: 'rgba(0, 0, 0, 0.5)' }}
                        onClick={handleCloseModal} // Fechar o modal ao clicar no botão
                    >
                        <Close />
                    </IconButton>
                </Box>
            </Modal>
        </>
    );
}

export default Ingresso;
