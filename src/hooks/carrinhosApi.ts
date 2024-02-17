import { api } from "./useApi";


// Definição do tipo para cada lote do carrinho
type LoteCarrinho = {
    lote_id: number;
    lote_quantidade: number;
};

// Definição do tipo para o objeto que será enviado
type Carrinho = {
    carrinho_lotes: LoteCarrinho[];
};



export const useCarrinhosApi = () => ({
    postCarrinho: async ({ carrinho_lotes }: Carrinho) => {
        const response = await api.post('/carrinhos', { carrinho_lotes: carrinho_lotes });
        return response.data;
    },
    getCarrinho: async (carrinho_hash: any) => {
        const response = await api.get(`carrinhos/carrinho/${carrinho_hash}`);
        return response.data;
    },
    getIngressos: async () => {
        const response = await api.get('carrinhos/ingressos/meus-ingressos');
        return response.data;
    }
});
