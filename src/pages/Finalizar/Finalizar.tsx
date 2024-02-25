import React, { useContext, useEffect, useRef, useState } from 'react';
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
import moment, { Moment } from 'moment';
import { Skeleton } from '@mui/material';

 initMercadoPago("APP_USR-208ce83a-ed27-43ee-aff4-a8c513a2dbb0"); // producao
/* initMercadoPago("APP_USR-acda3fac-7f4a-42db-8035-48b8d4fb3d04"); */ // testes


const Finalizar: React.FC = () => {
    const { carrinho_hash } = useParams();

    const carrinhosApi = useCarrinhosApi();

    const { theme } = useTheme();
    const mercadoPago = mercadoPagoApi();
    const [needInit, setNeedInit] = useState<boolean>(true);
    const [preferenceId, setPreferenceId] = useState<string>("");
    const [items, setItems] = useState<any[]>([]);
    const [expirationDate, setExpirationDate] = useState<Moment | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    const timerRef = useRef<any>(null);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const carrinho = await carrinhosApi.getCarrinho(carrinho_hash);
            setItems(carrinho.carrinho_lotes);
            setPreferenceId(carrinho.pagamento.pagamento_preference_id);
            setExpirationDate(moment(carrinho.carrinho_expiracao));
            setLoading(false);
        };
        init();
    }, []);

    useEffect(() => {
        if (expirationDate) {
            const intervalId = setInterval(() => {
                const now = moment();
                const diffInSeconds = expirationDate.diff(now, 'seconds');
                if (diffInSeconds > 0) {
                    const minutes = Math.floor(diffInSeconds / 60).toString().padStart(2, '0');
                    const seconds = (diffInSeconds % 60).toString().padStart(2, '0');
                    const timeRemaining = `${minutes}:${seconds}`;
                    if (timerRef.current) {
                        timerRef.current.textContent = timeRemaining; // Update the text content of the span element
                    }
                } else {
                    clearInterval(intervalId);
                    if (timerRef.current) {
                        Swal.fire({
                            title: 'Carrinho Expirado',
                            text: 'O carrinho expirou, por favor, tente novamente.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.href = '/';
                        })
                        timerRef.current.textContent = "Expirado"; // Update the text content of the span element
                    }
                }
            }, 1000);
            return () => clearInterval(intervalId); // This will clear the interval when the component unmounts
        }
    }, [expirationDate]);

    return (
        <FinalizarContainer theme={theme}>
            <FinalizarContainer theme={theme}>
                {loading ? (
                    <>
                        <br />
                        <Skeleton variant="rounded" width={"100%"} height={175} />
                        <br />
                        <Skeleton variant="rounded" width={"100%"} height={100} />
                        <br />
                        <Skeleton variant="rounded" width={"100%"} height={100} />
                        <br />
                    </>
                ) : (
                    <ResumoPedido items={items}/>
                )}
                <WalletContainer theme={theme}>
                    <div className="sizing">
                        {loading ? (
                            <Skeleton variant="rounded" width={"100%"} height={55} />
                        ) : (
                            <>
                                <WalletAbsolute theme={theme}>
                                    <div className="wrapper">
                                        <div className="button">
                                            <div className='finalizar'>
                                                Finalizar Compra
                                            </div>
                                            <p>
                                                Tempo restante: <span ref={timerRef}></span>
                                            </p>
                                        </div>
                                    </div>
                                </WalletAbsolute>
                                <Wallet
                                    initialization={{ preferenceId: preferenceId, redirectMode: "modal"}}
                                />
                            </>
                        )}
                    </div>
                </WalletContainer>
            </FinalizarContainer>
        </FinalizarContainer >
    )
}

export default Finalizar;
