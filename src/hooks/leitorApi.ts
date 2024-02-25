import { api } from "./useApi";

export const useLeitorApi = () => ({
    getHashLeitor: async (senha: string) => {
        try {
            const response = await api.get(`/empresas/hash-leitor/${senha}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    },

    getQrcodeData: async (qrcode: string, hash: string) => {
        try {
            const response = await api.get(`/qrcodes/${hash}/${qrcode}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    },

    entrada: async (qrcode: string, hash: string) => {
        try {
            const response = await api.post(`/qrcodes/entrada/${hash}/${qrcode}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
});
