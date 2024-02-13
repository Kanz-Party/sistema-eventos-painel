// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`;

export const IngressoContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

export const TituloIngresso = styled.h2`
  font-size: 18px;
  margin: 0 0 10px 0;
`;

export const DetalhesIngresso = styled.p`
  margin: 5px 0;
`;

export const PagamentoContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 20px 0;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PagamentoDetalhes = styled.div`
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
`;