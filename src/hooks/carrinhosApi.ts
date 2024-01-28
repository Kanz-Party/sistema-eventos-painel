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
    postCarrinho: async ({carrinho_lotes}: Carrinho) => {

        console.log(carrinho_lotes);

        let carrinhos_lotes = carrinho_lotes.map((lote) => {
            return {
                lote_id: lote.lote_id,
                lote_quantidade: lote.lote_quantidade,
            };
        });

        const response = await api.post('/carrinhos', {carrinho_lotes : carrinho_lotes});

        console.log(response.data);
        return response.data;
    },
});
