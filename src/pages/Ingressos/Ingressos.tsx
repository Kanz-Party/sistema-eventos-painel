import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, IngressoContainer, TituloIngresso, DetalhesIngresso, PagamentoContainer, PagamentoDetalhes, CheckoutLink } from './styles'; // Ajuste o caminho de importação conforme necessário
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import { Check } from '@mui/icons-material';

// Definição atualizada para refletir os novos dados
type Ingresso = {
    carrinho_id: number;
    ingresso_id: number;
    ingresso_descricao: string;
    lote_id: number;
    lote_descricao: string;
    lote_quantidade: number;
    lote_preco: string;
    pagamento_id: number;
    usuario_id: number;
    pagamento_status: number;
    pagamento_checkout_url: string;
    pagamento_preference_id: string;
    pagamento_expiracao: string;
    pagamento_mercadopago_id: null | string;
    qrcode_id: string;
};

// Estrutura para agrupar ingressos por pagamento
type IngressosPorPagamento = {
    [key: number]: Ingresso[];
};

const ListagemIngressos: React.FC = () => {
    const [ingressosPorPagamento, setIngressosPorPagamento] = useState<IngressosPorPagamento>({});

    const carrinhosApi = useCarrinhosApi();

    useEffect(() => {
        const fetchIngressos = async () => {
            const data = await carrinhosApi.getIngressos();
            const agrupadosPorPagamento: IngressosPorPagamento = data.reduce((acc: IngressosPorPagamento, ingresso: Ingresso) => {
                (acc[ingresso.pagamento_id] = acc[ingresso.pagamento_id] || []).push(ingresso);
                return acc;
            }, {});
            setIngressosPorPagamento(agrupadosPorPagamento);
            console.log(agrupadosPorPagamento);
        };

        fetchIngressos();
    }, []);

    return (
        <Container>
            {Object.entries(ingressosPorPagamento).map(([pagamentoId, ingressos]) => (
                <PagamentoContainer key={pagamentoId}>
                    <PagamentoDetalhes>Status do pagamento : {
                        ingressos[0].pagamento_status === 0 ? "Aguardando pagamento" :
                            ingressos[0].pagamento_status === 1 ? "Pago" :
                                "Cancelado"
                    } <br /> Expira em: {new Date(ingressos[0].pagamento_expiracao).toLocaleString()
                        }</PagamentoDetalhes>
                    {ingressos.map((ingresso, index) => (
                        <IngressoContainer key={index}>
                            <TituloIngresso>{ingresso.ingresso_descricao}</TituloIngresso>
                            <DetalhesIngresso>{ingresso.lote_descricao} - R$ {Number(ingresso.lote_preco).toFixed(2)}</DetalhesIngresso>
                            <DetalhesIngresso>Quantidade: {ingresso.lote_quantidade}</DetalhesIngresso>
                            {
                                ingresso.qrcode_id && (
                                    <QRCode value={ingresso.qrcode_id} />
                                )
                            }
                            <CheckoutLink href={ingresso.pagamento_checkout_url} target="_blank">
                                <Check />
                                Verificar pagamento
                            </CheckoutLink>

                        </IngressoContainer>
                    ))}
                </PagamentoContainer>
            ))}
            {Object.entries(ingressosPorPagamento).length === 0 && (
                <div>
                    <h2>Nenhum ingresso comprado</h2>
                </div>
            )}
        </Container>
    );
};

export default ListagemIngressos;
