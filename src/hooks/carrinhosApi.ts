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

type getCarrinho = {
    hash: string;
};

export const useCarrinhosApi = () => ({
    postCarrinho: async ({ carrinho_lotes }: Carrinho) => {


        let carrinhos_lotes = carrinho_lotes.map((lote) => {
            return {
                lote_id: lote.lote_id,
                lote_quantidade: lote.lote_quantidade,
            };
        });

        const response = await api.post('/carrinhos', { carrinho_lotes: carrinho_lotes });

        return response.data;
    },
    getCarrinho: async (carrinho_hash: any) => {
        const response = await api.get(`/carrinhos/${carrinho_hash}`);
        return response.data;
    }
});
