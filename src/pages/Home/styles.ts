import styled from 'styled-components';
import { ThemeType } from '../../types/Theme';

const HomeContainer = styled.div<{ theme: ThemeType }>`
padding-bottom: 50px;
`;

const Header = styled.div<{ theme: ThemeType }>`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  .logo {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .login-button {
    /* Estilização adicional para o botão de login pode ser adicionada aqui */
  }
`;

const LogoStyle = styled.img`
  width: 100px;
`;

const BackgroundVideoContainer = styled.div`
  position: fixed; /* Usado para fixar o vídeo em relação à viewport */
  top: 0;
  left: 0;
  width: 100vw; /* 100% da largura da viewport */
  height: 100vh; /* 100% da altura da viewport */
  overflow: hidden;
  z-index: -1; /* Mantém o vídeo atrás do conteúdo */
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Garante que o vídeo cubra todo o espaço disponível sem perder as proporções */
  }
`;

export const EventDescription = styled.div`
    margin: 20px 0;
    padding: 15px;
    background-color: ${props => props.theme.backgroundColorSecondary};
    color: ${props => props.theme.textColorSecondary};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   
    text-align: left;

    h2 {
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 24px;
        color: ${props => props.theme.primaryColor};
        font-weight: bold;
    }

    p {
        margin-bottom: 15px;
        line-height: 1.6;
        font-size: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const LoginButton = styled.div`
 color: white;
 cursor: pointer;
`;

const BannerContainer = styled.div<{ background: string }>`
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 5px 0;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.background}); /* Usa a prop 'background' */
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
  }
`;

const BannerImage = styled.img`

  max-width: 50%;
  height: auto;
  position: relative;
  z-index: 1;
  border-radius: 5%;
`;

const EventSection = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const EventTitle = styled.h2`
  color: #343a40;
  margin-bottom: 10px;
  font-family: 'Bassunpersonaluse';
`;

const EventDetails = styled.p`
  color: #6c757d;
  margin-bottom: 5px;
`;

const EventLocation = styled.p`
  color: #007bff;
  font-weight: bold;
`;

const TicketsContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Ticket = styled.div`
  border: 1px solid #eaeaea;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`;

const TicketTitle = styled.h3`
  color: #007bff;
  margin-bottom: 10px;
`;

const TicketPrice = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TicketInfo = styled.p`
  color: #6c757d;
  margin-bottom: 5px;
`;

const PromoCodeInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const SelectTicketButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TicketLot = styled.p`
  margin-bottom: 5px;
  color: #343a40;
`;

const BuyButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const QuantitySelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
`;

const FinalizeButton = styled.button<{ theme: ThemeType }>`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.colors.brandPrimary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.3;

 
`;


export {
    HomeContainer, Header, LogoStyle, LoginButton, BannerContainer,
    BannerImage, EventSection, EventTitle, EventDetails, EventLocation,
    TicketsContainer, Ticket, TicketTitle, TicketPrice, TicketInfo,
    PromoCodeInput, SelectTicketButton, TicketLot, BuyButton, QuantitySelect, QuantityButton, QuantityDisplay, FinalizeButton,BackgroundVideoContainer
};
