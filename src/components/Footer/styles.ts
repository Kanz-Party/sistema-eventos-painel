import styled from 'styled-components';

// Ajustes para o container do rodapé
export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  color: white;

  // Media query para ajustes de desktop
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  svg {
    font-size: 25px;
    fill: #f0ce8c;
  }
  a{
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
`;

export const LogoStyles = styled.img`
  width: 100px; // Ajuste conforme necessário
  margin-bottom: 10px;

  // Media query para ajustes de desktop
  @media (min-width: 768px) {
    margin-bottom: 20px; // Aumentar a margem no desktop
  }
`;

export const FooterText = styled.p`
  display: flex;
  align-items: center; // Centraliza o ícone com o texto
  gap: 10px; // Espaçamento entre ícone e texto
  margin: 5px 0;
  text-align: center; // Centraliza o texto
  font-size: 16px; // Tamanho uniforme do texto

  svg {
    font-size: 25px;
    fill: #f0ce8c;
  }
  a{
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 10px;
    color: white;
  }

  // Media query para ajustes de desktop
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

export const Container = styled.div`
`;

export const Medias = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  // Media query para ajustes de desktop
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;

// Componente Footer permanece inalterado
