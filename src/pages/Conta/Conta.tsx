import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Paper, Box, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material';
import Swal from 'sweetalert2';
import { getUsuario } from '../../hooks/usuarioApi';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { atualizaUsuario } from '../../hooks/usuarioApi';
import InputMask from 'react-input-mask';


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
    nome: z.string().optional(),
    cpf: z.string().min(14, 'CPF inválido').max(14, 'CPF inválido').optional(),
    email: z.string().email('E-mail inválido').optional(),
    telefone: z.string().min(14, 'Telefone inválido').max(15, 'Telefone inválido').optional(),
    endereco: z.string().optional(),
    cep: z.string().min(9, 'CEP inválido').max(9, 'CEP inválido').optional(),
    senha: z.string().optional(),
    confirmacaoSenha: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.senha || data.confirmacaoSenha) {
      if (data.senha !== data.confirmacaoSenha) {
        ctx.addIssue({
          path: ["confirmacaoSenha"],
          message: "Senhas não conferem",
          code: "custom", // Adicionado o código do erro
        });
      }
      if (data.senha && data.senha.length < 6) {
        ctx.addIssue({
          path: ["senha"],
          message: "Senha deve ter no mínimo 6 caracteres",
          code: "custom", // Adicionado o código do erro
        });
      }
    }
  });


  // Tipo inferido para os dados do formulário, baseado no esquema
  type FormularioDados = z.infer<typeof schema>;



const EdicaoConta: React.FC = () => {


    const auth = React.useContext(AuthContext);

    const [user, setUser] = useState<any>(null);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormularioDados>({
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
            nome: user ? user.usuario_nome : '',
            cpf: user ? user.usuario_cpf : '',
            email: user ? user.usuario_email : '',
            telefone: user ? user.usuario_telefone : '',
            endereco: user ? user.usuario_endereco : '',
            cep: user ? user.usuario_cep : '',
            senha: '',
            confirmacaoSenha: '',

        });
    }
        , [user, reset]);



    const onSubmit: SubmitHandler<FormularioDados> = data => {


        const usuario = {
            nome: data.nome,
            cpf: data.cpf,
            email: user.usuario_email,
            telefone: data.telefone,
            endereco: data.endereco,
            cep: data.cep,
            senha: data.senha,
        }

        atualizaUsuario(auth.user.usuarioId, usuario).then((response) => {

            Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário atualizado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        }).catch((error) => {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao atualizar usuário!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    return (
        <Container>
            <StyledPaper elevation={6}>
                <Typography component="h1" variant="h5">
                    Dados da Conta
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="nome"
                        control={control}
                        defaultValue=""

                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"

                                fullWidth
                                label="Nome"
                                error={!!errors.nome}
                                helperText={errors.nome?.message}
                            />
                        )}
                    />
                    <Controller
                        name="cpf"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="999.999.999-99" value={field.value} onChange={field.onChange}>
                                {(inputProps: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => (
                                    <TextField
                                        {...inputProps}
                                        variant="outlined"
                                        margin="normal"
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
                                {(inputProps: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps, "variant">) => (
                                    <TextField
                                        {...inputProps}
                                        variant="outlined"
                                        margin="normal"
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
                        name="endereco"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                margin="normal"

                                fullWidth
                                label="Endereço"
                                error={!!errors.endereco}
                                helperText={errors.endereco?.message}
                            />
                        )}
                    />
                    <Controller
                        name="cep"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="99999-999" value={field.value} onChange={field.onChange}>
                                {(inputProps: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps, "variant">) => (
                                    <TextField
                                        {...inputProps}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="CEP"
                                        error={!!errors.cep}
                                        helperText={errors.cep?.message}
                                    />
                                )}
                            </InputMask>
                        )}
                    />

                    <Controller
                        name="email"
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
                        style={
                            {
                                color: 'black',
                                textDecoration: 'none',
                                backgroundColor: '#f0ce8c',
                            }
                        
                        }
                    >
                        Atualizar
                    </Button>
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default EdicaoConta;
