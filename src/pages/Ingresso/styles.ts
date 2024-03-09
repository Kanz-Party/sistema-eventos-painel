import styled from 'styled-components';
import Banner from '../../assets/images/banner.jpg';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  .ingresso-container {
    width: 300px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 10px 31px rgba(0, 0, 0, 0.3);
   

    .ingresso-header {
        text-align: center;
        margin-bottom: 20px;

        h2 {
            color: #161616;
            font-size: 22px;
            margin: 0;
        }
    }

    .ingresso-info {
        font-size: 16px;
        color: #484543;
        margin-bottom: 10px;

        p {
            span {
                color: #B1B1B1;
                font-weight: 500;
            }
        }
    }

    .ingresso-qrcode {
        text-align: center;
        background-color: #f0ce8c;
        position: relative; /* Adiciona posição relativa para usar o ::before */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
    
    .ingresso-qrcode::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${Banner});
        background-size: cover;
        filter: blur(2px); /* Aplica o filtro de desfoque apenas à imagem de fundo */
    }
}
}
`;