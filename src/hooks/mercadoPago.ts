import { api } from "./useApi";

export const mercadoPagoApi = () => ({
    createPay: async (id_carrinho: any = 106) => {
        const response = await api.post('/mercadoPago/create', { id_carrinho });
        return response.data;
    },
});