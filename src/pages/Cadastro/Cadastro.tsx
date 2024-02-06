import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import InputMask from 'react-input-mask';
import { criarUsuario } from '../../hooks/usuarioApi';
import Swal from 'sweetalert2';

// Definição do esquema de validação com Zod
const schema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    cpf: z.string().min(14, 'CPF é obrigatório').refine((val) => val.replace(/\D/g, '').length === 11, 'CPF deve ter 11 dígitos'),
    telefone: z.string().min(1, 'Telefone é obrigatório').refine((val) => val.replace(/\D/g, '').length === 11, 'Telefone deve ter 11 dígitos'),
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

    const onSubmit: SubmitHandler<CadastroFormData> = data => {
        criarUsuario(data)
            .then((res) => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    console.log(res);
                    localStorage.setItem('token', res.token);
                  
                });
            })
            .catch((error) => {
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
                        name="nome"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nome"
                                autoFocus
                                error={!!errors.nome}
                                helperText={errors.nome?.message}
                            />
                        )}
                    />
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
                        name="cpf"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="999.999.999-99" value={field.value} onChange={field.onChange}>
                                {(inputProps: any) => (
                                    <TextField
                                        {...inputProps}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="CPF"
                                        error={!!errors.cpf}
                                        helperText={errors.cpf?.message}
                                    />
                                )}
                            </InputMask>
                        )}
                    />
                    <Controller
                        name="telefone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange}>
                                {(inputProps: any) => (
                                    <TextField
                                        {...inputProps}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Telefone"
                                        error={!!errors.telefone}
                                        helperText={errors.telefone?.message}
                                    />
                                )}
                            </InputMask>
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
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Cadastro;
