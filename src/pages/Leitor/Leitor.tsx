import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, TextField, Button } from '@mui/material';
import './styles'; // Import your custom styles if needed
import { LeitorContainer } from './styles';
import { useLeitorApi } from '../../hooks/leitorApi';
import { set } from 'react-hook-form';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Swal from 'sweetalert2';
import ResumoIngresso from '../../components/ResumoIngresso/ResumoIngresso';
import { ResumoIngressoLeitor } from '../../types/Ingresso';

interface LeitorProps {

}

const Leitor: React.FC<LeitorProps> = ({}) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hash, setHash] = useState('');
    const [qrcodeData, setQrcodeData] = useState<ResumoIngressoLeitor | null>(null);
    const [loading, setLoading] = useState(false);

    const api = useLeitorApi();

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const onSubmit = async () => {
        setError('');
        if (!password) {
            setError('Senha de acesso é obrigatória');
            return;
        }
        
        api.getHashLeitor(password).then((response) => {
        if (response.err) {
            setError(response.message);
        } else {
            setHash(response);
        }
        });
    };   

    const onReadQrCode = async (result: any) => {
        //check if the result is a 16 or 5 digit number
        setLoading(true);
        if (result && (result.length === 16 || result.length === 5)) {
            const res = await api.getQrcodeData(result, hash);
            if (res.err) {
                await Swal.fire({
                    title: 'Erro',
                    text: res.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                setQrcodeData(null);
            } else {
                console.log(res);
                setQrcodeData(res);
            }
        } else {
            await Swal.fire({
                title: 'Erro',
                text: 'Código inválido',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setQrcodeData(null);
        }
        setLoading(false);
    };

    const entrada = async () => {
        setLoading(true);
        Swal.fire({
            title: 'Confirmação',
            text: 'Confirma a entrada do usuário?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await api.entrada(qrcodeData!.qrcode_id, hash);
                if (res.err) {
                    await Swal.fire({
                        title: 'Erro',
                        text: res.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    await Swal.fire({
                        title: 'Sucesso',
                        text: 'Entrada confirmada',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                }
            }
            setQrcodeData(null);
        });
        setLoading(false);
    }

    const onReadError = (error: any) => {
        setQrcodeData(null);
        console.error(error);
    };

    useEffect(() => {
        onReadQrCode('16139')
    }, [hash]);


    return (
        <LeitorContainer>
            {hash ? (
                <>
                    {loading ? (
                        <>
                            <p>Carregando...</p>
                        </>
                    ) : (
                        <>
                            {qrcodeData ? (
                                <>
                                    <ResumoIngresso
                                        ingresso={qrcodeData}
                                    />
                                    <div className="botoes">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                setQrcodeData(null);
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={entrada}
                                        >
                                            Confirmar Entrada
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="scanner-container">
                                    <QrScanner
                                        constraints={{
                                            facingMode: 'environment',
                                            width: 100,
                                            height: 100,
                                        }}
                                        onDecode={onReadQrCode}
                                        onError={onReadError}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <Card style={{ padding: 20 }}>
                    <TextField
                        label="Senha de acesso"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={!!error}
                        helperText={error}
                        fullWidth
                        autoComplete="off" // Prevent browser autocompletion
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                        onClick={onSubmit}
                    >
                        Acessar
                    </Button>
                </Card>
            )}
        </LeitorContainer>
    );
};

export default Leitor;
