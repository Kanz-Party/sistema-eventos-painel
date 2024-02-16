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
import Swal from 'sweetalert2';

initMercadoPago("TEST-d4c240b1-40e8-44f6-8251-bdc0b5e9c022");


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
                if (!selectedTickets) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Erro ao finalizar a compra!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/';
                        }
                    });
                    
       
                    return;

                }




                carrinhosApi.postCarrinho(selectedTickets).then((response) => {
                    setPreferenceId(response.preference_id);
                    setItems(response.items);
                    setNeedInit(false);
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Erro ao finalizar a compra!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/';
                        }
                    });
                    
                    return;
            
                }
                );
            }



        };
        init();
    }, [auth.logado, carrinhosApi, selectedTickets, needInit]);


    if (!auth.logado) {
        return <Cadastro />
    }



    return (
        <FinalizarContainer theme={theme}>
            <FinalizarContainer theme={theme}>
                <ResumoPedido items={items} />
                <Wallet
                    initialization={{ preferenceId: preferenceId, redirectMode: "modal" }}
                    customization={{ buttonColor: "#FF0000" } as any}
                />
            </FinalizarContainer>
        </FinalizarContainer >
    )
}

export default Finalizar;