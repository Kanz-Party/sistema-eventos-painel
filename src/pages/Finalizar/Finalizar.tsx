import React, { useContext, useEffect, useState } from 'react';
import './styles';
import { FinalizarContainer, WalletAbsolute, WalletContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import Cadastro from '../Cadastro/Cadastro';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { mercadoPagoApi } from '../../hooks/mercadoPago';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import ResumoPedido from './ResumoPedido';
import Swal from 'sweetalert2';
import { useLocation, useParams } from 'react-router-dom';

initMercadoPago("APP_USR-acda3fac-7f4a-42db-8035-48b8d4fb3d04");


const Finalizar: React.FC = () => {
    const { carrinho_hash } = useParams();

    const carrinhosApi = useCarrinhosApi();

    const { theme } = useTheme();
    const mercadoPago = mercadoPagoApi();
    const [needInit, setNeedInit] = useState<boolean>(true);
    const [preferenceId, setPreferenceId] = useState<string>("");
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const init = async () => {
            const carrinho = await carrinhosApi.getCarrinho(carrinho_hash);
            setItems(carrinho.carrinho_lotes);
            setPreferenceId(carrinho.pagamento.pagamento_preference_id);
            console.log(carrinho);
        };
        init();
    }, []);

    return (
        <FinalizarContainer theme={theme}>
            <FinalizarContainer theme={theme}>
                <ResumoPedido items={items} />
                    <WalletContainer>
                        <WalletAbsolute>
                            Ir para o checkout
                        </WalletAbsolute>
                        <Wallet
                            initialization={{ preferenceId: preferenceId, redirectMode: "modal"}}
                        />
                    </WalletContainer>
            </FinalizarContainer>
        </FinalizarContainer >
    )
}

export default Finalizar;