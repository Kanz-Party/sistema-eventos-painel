import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { ThemeType } from '../../types/Theme';

type PedidoProps = {
  items: any;
};


const ResumoContainer = styled.div<{theme: ThemeType}>`
  background-color: ${({theme}) => theme.colors.gray};
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const Titulo = styled.h2`
  color: ${({theme}) => theme.colors.main};
`;

const ItemContainer = styled.div<{theme: ThemeType}>`
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
    const {theme} = useTheme();

    return (
      <ResumoContainer theme={theme}>
        <Titulo theme={theme}>Resumo do Pedido</Titulo>
        {items.map((item: any, index: number) => (
            <ItemContainer theme={theme} key={index}>
              <ItemTitulo theme={theme}>{item.ingresso_descricao} - {item.lote_descricao}</ItemTitulo>
              <ItemDetalhes theme={theme}>Quantidade: {item.lote_quantidade}</ItemDetalhes>
              <ItemDetalhes theme={theme}>Preço Unitário: R$ {(item.lote_preco/100).toFixed(2).replace('.', ',')}</ItemDetalhes>
            </ItemContainer>
        ))}
        <ItemContainer theme={theme}>
          <ItemTitulo theme={theme}>Total</ItemTitulo>
          <ItemDetalhes theme={theme}>R$ {(items.reduce((total: number, item: any) => total + item.lote_preco * item.lote_quantidade, 0)/100).toFixed(2).replace('.', ',')}</ItemDetalhes>
        </ItemContainer>
      </ResumoContainer>
    );
};

export default ResumoPedido;
