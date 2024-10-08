import axios from "axios";

// Verificar se está em localhost
const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

// Definir baseURL dependendo do ambiente
const baseURL = isLocalhost
    ? "http://localhost:21021/"
    : "https://kanzparty.com.br/api/";

const api = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("token"),
    },
});

api.interceptors.request.use((config) => {
    config.headers['authorization'] = "Bearer " + localStorage.getItem("token");
    return config;
}, (error) => {
    return Promise.reject(error);
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/usuarios/verifica_sessao');

        return response.data;
    },
    signin: async (email: string, senha: string) => {

        const response = await api.post('/usuarios/login', { email, senha });

        return response.data;
    },

    logout: async () => {

        return {
            status: true
        }

    }
})

export { api };