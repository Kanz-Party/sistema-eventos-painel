import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080',
});


export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            user: {
                id: 3,
                name: 'Teste',
                email: ' teste@teste.com',
            }
        }
        const response = await api.post('/validade', { token });
        return response.data;
    },
    signin: async (email: string, senha: string) => {
      
        const response = await api.post('/login', { email, senha });

        return response.data;
    },

    logout: async () => {

        return {
            status: true
        }


        const response = await api.post('/logout');
        return response.data;
    }
})