import Swal from "sweetalert2";
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
    getMeusCarrinhos: async () => {
        const response = await api.get('carrinhos/carrinhos/meus-carrinhos');
        return response.data;
    },
    getCarrinho: async (carrinho_hash: any) => {
        try {
            const response = await api.get(`carrinhos/carrinho/${carrinho_hash}`);

            return response.data;
        } catch (error: any) {
            console.error("Error:", error);
            if (error.response.data.err && error.response.data.err === 'CARRINHO_EXPIRADO') {
                Swal.fire({
                    title: 'Carrinho Expirado',
                    text: 'O carrinho expirou, por favor, tente novamente.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/';
                });
                return;
            }
            throw error;
        }
    },
    getIngressos: async () => {
        const response = await api.get('carrinhos/ingressos/meus-ingressos');
        return response.data;
    },
    getMeusQrCodes: async (id_carrinho: any) => {
        const response = await api.get(`carrinhos/carrinho/meus-qrcodes/${id_carrinho}`);
        return response.data;
    }
});
