import React, { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import InputMask from 'react-input-mask';
import { criarUsuario } from '../../hooks/usuarioApi';
import Swal from 'sweetalert2';
import { CarrinhoContext } from '../../contexts/Carrinho/CarrinhoContext';
import { useNavigate } from 'react-router-dom';

// Definição do esquema de validação com Zod
const schema = z.object({
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmacaoSenha: z.string(),
}).refine((data) => data.senha === data.confirmacaoSenha, {
    message: "Senhas não conferem",
    path: ["confirmacaoSenha"], // Caminho do erro
});

type CadastroFormData = z.infer<typeof schema>;

const Cadastro: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<CadastroFormData>({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<CadastroFormData> = data => {
        criarUsuario(data)
            .then((res) => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    localStorage.setItem('token', res.token);
                    navigate('/')
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: 'Erro!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
 
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, p: 3 }}>
                <Typography component="h1" variant="h5">
                    Cadastro
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                  
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="E-mail"
                                error={!!errors.email}
                                helperText={errors.email?.message}
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
                                required
                                fullWidth
                                label="Senha"
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
                                required
                                fullWidth
                                label="Confirmação de Senha"
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
                        style={
                            {
                                color: 'black',
                                textDecoration: 'none',
                                backgroundColor: '#f0ce8c',
                            }
                        
                        }
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Cadastro;
