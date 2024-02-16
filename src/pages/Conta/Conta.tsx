import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { getUsuario } from '../../hooks/usuarioApi';
import { AuthContext } from '../../components/contexts/Auth/AuthContext';



const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const StyledPaper = styled(Paper)`
    padding: 32px;
    margin-top: 16px;
`;

const schema = z.object({
    usuario_nome: z.string().min(1, 'Nome é obrigatório'),
    usuario_cpf: z.string().min(11, 'CPF inválido').max(14, 'CPF inválido'), // Simples validação de tamanho
    usuario_email: z.string().email('E-mail inválido'),
    usuario_telefone: z.string().min(10, 'Telefone inválido').max(11, 'Telefone inválido'), // Validação básica de tamanho
    usuario_endereco: z.string().min(1, 'Endereço é obrigatório'),
    usuario_cep: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'), // Validação básica de tamanho
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmacaoSenha: z.string(),
}).refine((data) => data.senha === data.confirmacaoSenha, {
    message: "Senhas não conferem",
    path: ["confirmacaoSenha"],
});

type EdicaoFormData = z.infer<typeof schema>;



const EdicaoConta: React.FC = () => {


    const auth = React.useContext(AuthContext);

    const [user, setUser] = useState<any>(null);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<EdicaoFormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const init = async () => {

            getUsuario(auth.user.usuarioId).then((response) => {

                console.log('response', response.data)

                setUser(response.data);


            });
        }


        init()

    }, [auth?.user.usuarioId, reset]);

    useEffect(() => {
        reset({
            usuario_nome: user ? user.usuario_nome : '',
            usuario_cpf: user ? user.usuario_cpf : '',
            usuario_email: user ? user.usuario_email : '',
            usuario_telefone: user ? user.usuario_telefone : '',
            usuario_endereco: user ? user.usuario_endereco : '',
            usuario_cep: user ? user.usuario_cep : '',
            senha: '',
            confirmacaoSenha: '',

        });
    }
        , [user, reset]);



    const onSubmit: SubmitHandler<EdicaoFormData> = data => {

    };

    return (
        <Container>
            <StyledPaper elevation={6}>
                <Typography component="h1" variant="h5">
                    Dados da Conta
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="usuario_nome"
                        control={control}
                        defaultValue=""

                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                            
                                fullWidth
                                label="Nome"
                                error={!!errors.usuario_nome}
                                helperText={errors.usuario_nome?.message}
                            />
                        )}
                    />
                    <Controller
                        name="usuario_cpf"
                        control={control}
                        defaultValue=""

                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                            
                                fullWidth
                                label="CPF"
                                error={!!errors.usuario_cpf}
                                helperText={errors.usuario_cpf?.message}
                            />
                        )}
                    />
                    <Controller
                        name="usuario_telefone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                          
                                fullWidth
                                label="Telefone"
                                error={!!errors.usuario_telefone}
                                helperText={errors.usuario_telefone?.message}
                            />
                        )}
                    />
                    <Controller
                        name="usuario_endereco"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                          
                                fullWidth
                                label="Endereço"
                                error={!!errors.usuario_endereco}
                                helperText={errors.usuario_endereco?.message}
                            />
                        )}
                    />
                    <Controller
                        name="usuario_cep"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                         
                                fullWidth
                                label="CEP"
                                error={!!errors.usuario_cep}
                                helperText={errors.usuario_cep?.message}
                            />
                        )}
                    />
                    <Controller
                        name="usuario_email"
                        control={control}
                        defaultValue=""
                        disabled
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                             
                                fullWidth
                                label="E-mail"
                                error={!!errors.usuario_email}
                                helperText={errors.usuario_email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="senha"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                             
                                fullWidth
                                label="Nova Senha"
                                type="password"
                                error={!!errors.senha}
                                helperText={errors.senha?.message}
                            />
                        )}
                    />
                    <Controller
                        name="confirmacaoSenha"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                             
                                fullWidth
                                label="Confirmação de Nova Senha"
                                type="password"
                                error={!!errors.confirmacaoSenha}
                                helperText={errors.confirmacaoSenha?.message}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Atualizar
                    </Button>
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default EdicaoConta;
