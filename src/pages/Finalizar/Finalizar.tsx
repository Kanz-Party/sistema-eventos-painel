import React, { useContext, useEffect, useState } from 'react';
import './styles';
import { FinalizarContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import Cadastro from '../Cadastro/Cadastro';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { mercadoPagoApi } from '../../hooks/mercadoPago';
import { useCarrinhos } from '../../contexts/Carrinhos/CarrinhosProvider';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
import ResumoPedido from './ResumoPedido';

initMercadoPago("TEST-6a9e6a10-797b-4a87-ba77-931187859385");


const Finalizar: React.FC = () => {

    const { selectedTickets, finalizePurchase, loading, setLoading } = useCarrinhos();

    const carrinhosApi = useCarrinhosApi();

    const { theme } = useTheme();
    const mercadoPago = mercadoPagoApi();
    const [needInit, setNeedInit] = useState<boolean>(true);
    const [preferenceId, setPreferenceId] = useState<string>("");
    const [items, setItems] = useState<any[]>([]);
    const auth = useContext(AuthContext);


    useEffect(() => {
        const init = async () => {
            if (auth.logado && needInit) {
                const data = await carrinhosApi.postCarrinho(selectedTickets);
                setNeedInit(false);
                if (data && data.items) {
                    setItems(data.items);
                    setPreferenceId(data.pagamento.pagamento_preference_id);
                }
            }
        };
        init();
    }, [auth.logado, carrinhosApi, selectedTickets]);

    if (!auth.logado) {
        return <Cadastro />
    }



    return (
        <FinalizarContainer theme={theme}>
            <FinalizarContainer theme={theme}>
                <ResumoPedido items={items} />
                <Wallet
                    initialization={{ preferenceId: preferenceId,redirectMode: "modal"}}
                    customization={{ buttonColor: "#FF0000" } as any}
                />
            </FinalizarContainer>
        </FinalizarContainer >
    )
}

export default Finalizar;