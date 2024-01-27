import { api } from "./useApi";

export const useIngressosApi = () => ({
    getIngressos: async () => {
        const response = await api.get('/ingressos');

        return response.data;
    },
});
