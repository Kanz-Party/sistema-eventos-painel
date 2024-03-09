// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  .pedido_container{
    width: 272px;
    min-height: 200px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0px 10px 31px rgba(0,0,0,0.3);
    padding: 20px 16px 16px 16px;
    margin-right: 30px;
    margin-bottom: 30px;
    .pedido{
      display: block;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.38;
    text-align: left;
    color: #161616;
    text-transform: uppercase;
    }
    .status{
      
        font-size: 14px;
        text-align: left;
      line-height: 1.5;
      color: #99bd73;
      font-weight: 500;
      
    }
    .data{
      font-size: 14px;
      text-align: left;
    line-height: 1.5;
    color: #B1B1B1;
    font-weight: 500;
    }
    .infos{
      display: flex;
      justify-content: space-between;
      .quantidade,.valor_total{
        font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: left;
    display: block;
    color: #484543;
    max-width: 185px;
    span{
      font-size: 14px;
      line-height: 1.5;
      color: #B1B1B1;
      font-weight: 500;
    }
      }
      
  }
    }
  }
`;

export const IngressoContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  margin: 10px 0;
  background-color: #fff; /* Fundo branco para o card */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1); /* Sombra para efeito flutuante */
  transition: transform 0.2s; /* Animação para efeito de flutuação ao passar o mouse */

  &:hover {
    transform: translateY(-5px); /* Efeito de flutuação ao passar o mouse */
  }
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1); /* Sombra para efeito flutuante */
`;

export const PagamentoDetalhes = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

export const CheckoutLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  margin: 15px 0;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;