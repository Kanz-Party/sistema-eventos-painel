export type TicketData = {
    ingresso_id: number;
    lote_id: number;
    ingresso_descricao: string;
    lote_descricao: string;
    lote_preco: number;
    lote_quantidade_maxima: number;
}

export type SelectedTicket = {
    lote_id: number;
    lote_quantidade: number;
}

export type SelectedTickets = {
    carrinho_lotes: SelectedTicket[];
}