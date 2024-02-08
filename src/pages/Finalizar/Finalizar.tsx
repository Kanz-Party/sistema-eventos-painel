import React, { useContext, useEffect, useState } from 'react';
import './styles';
import { FinalizarContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import Cadastro from '../Cadastro/Cadastro';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { mercadoPagoApi } from '../../hooks/mercadoPago';
import { useIngressosApi } from '../../hooks/ingressosApi';
import { useCarrinhosApi } from '../../hooks/carrinhosApi';
initMercadoPago("TEST-6a9e6a10-797b-4a87-ba77-931187859385");


const Finalizar: React.FC = () => {

    const { theme } = useTheme();
    const mercadoPago = mercadoPagoApi();
    const [needInit, setNeedInit] = useState<boolean>(true);
    const [preferenceId, setPreferenceId] = useState<string>("");
    const [tickets, setTickets] = useState<any[]>([]);
    const auth = useContext(AuthContext);
    const ingressosApi = useIngressosApi();
    const UseCarrinhosApi = useCarrinhosApi();
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true); // Set loading to true before fetching data
    
            const data = await ingressosApi.getIngressos();
            setTickets(data);
    
            const getCarrinhoStorage = localStorage.getItem('carrinho');
    
            if (getCarrinhoStorage) {


                const carrinho = await UseCarrinhosApi.getCarrinho(getCarrinhoStorage);
    
                const { carrinho_lotes } = carrinho;
    
                const carrinhoLotes = carrinho_lotes.map((carrinhoLote: any) => {
                    const ticket = data.find((ticket: any) => ticket.lote_id === carrinhoLote.lote_id);
                    return {
                        ...ticket,
                        lote_quantidade: carrinhoLote.lote_quantidade
                    };
                });
    
      
            }

        };
    
        fetchTickets();
    
        // No dependencies in the dependency array to prevent infinite loop
    }, []);

    useEffect(() => {

        const init = async () => {
            const data = await mercadoPago.createPay();
            setPreferenceId(data.pagamento.pagamento_preference_id)
            console.log('preferencepagamento.pagamento_preference_id', data.pagamento.pagamento_preference_id);
        }

        if (needInit) {
            init();
            setNeedInit(false);
        }
    }, [])

    if (!auth.logado) {
        return <Cadastro />
    }



    return (
        <FinalizarContainer theme={theme}>
            <Wallet
                initialization={{ preferenceId: preferenceId }}
                customization={{ buttonColor: "#FF0000" } as any} 
     
            />
            
       
        </FinalizarContainer >
    )
}

export default Finalizar;