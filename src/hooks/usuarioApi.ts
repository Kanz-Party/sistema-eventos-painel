import { api } from "./useApi";

export const criarUsuario = async (usuario: any) => {
    const response = await api.post('/usuarios/create_login', usuario);

    return response.data;
}

export const verificaToken = async (token: string) => {
    const response = await api.get('/usuarios/verifica-token', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getUsuario = (id: number) => {
    const response = api.get(`/usuarios/${id}`);
    return response;
}

export const atualizaUsuario = (id: number, usuario: any) => {
    const response = api.put(`/usuarios/${id}`, usuario);
    return response;
}

export const recuperarSenha = (email: string) => {
    const response = api.post('/usuarios/redefinir_senha_token', { email });
    return response;
}
