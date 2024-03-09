import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container } from './styles'; // Ajuste o caminho de importação conforme necessário
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

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
    const [carrinhos, setCarrinhos] = useState<any>([])

    const carrinhosApi = useCarrinhosApi();

    useEffect(() => {
        const fetchIngressos = async () => {
            const data = await carrinhosApi.getMeusCarrinhos();
            setCarrinhos(data);
        };

        fetchIngressos();
    }, []);

    return (
        <Container>
            {carrinhos.map((carrinho: any) => (
                <>
                    <div className="pedido_container">
                        <div className="pedido">
                            PEDIDO #{carrinho.carrinho_id}
                        </div>
                        <div className="status">
                            {carrinho.pagamento_status === 1 ? 'FINALIZADO' : 'PAGAMENTO PENDENTE'}
                        </div>
                        <div className="data">
                            {moment(carrinho.carrinho_data_criacao).format('DD/MM/YYYY')}
                        </div>

                        <div className="infos">
                            <div className="quantidade">
                                QUANTIDADE <br />
                                <span>
                                    {carrinho.carrinho_itens}
                                </span>
                            </div>
                            <div className="valor_total">
                                VALOR TOTAL <br />
                                <span>{carrinho.carrinho_total}</span>
                            </div>
                        </div>
                        <div className="ver_pedido">
                            <Link to={`/ingresso/${carrinho.carrinho_id}`}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={
                                        {
                                            color: 'black',
                                            textDecoration: 'none',
                                            backgroundColor: '#f0ce8c',
                                        }

                                    }
                                >
                                    Ver Pedido
                                </Button>
                            </Link>
                        </div>
                    </div>
                </>
            ))}

        </Container >
    );
};

export default ListagemIngressos;
