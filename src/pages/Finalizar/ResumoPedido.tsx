import React from 'react';
import styled from 'styled-components';

type Item = {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    title: string;
    quantity: number;
    unit_price: number;
};

type PedidoProps = {
    items: Item[];
};


const ResumoContainer = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const Titulo = styled.h2`
  color: #333;
`;

const ItemContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemTitulo = styled.h3`
  color: #666;
  font-size: 16px;
  margin: 0;
`;

const ItemDetalhes = styled.p`
  color: #999;
  margin: 5px 0 0 0;
`;


const ResumoPedido: React.FC<PedidoProps> = ({ items }) => {
    return (
        <ResumoContainer>
            <Titulo>Resumo do Pedido</Titulo>
            {items.map((item) => (
                <ItemContainer key={item.id}>
                    <ItemTitulo>{item.title}</ItemTitulo>
                    <ItemDetalhes>Quantidade: {item.quantity}</ItemDetalhes>
                    <ItemDetalhes>Preço Unitário: R$ {item.unit_price.toFixed(2)}</ItemDetalhes>
                </ItemContainer>
            ))}
        </ResumoContainer>
    );
};

export default ResumoPedido;
