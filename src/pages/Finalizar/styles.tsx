import styled from 'styled-components';
import { ThemeType } from '../../types/Theme';
import { Wallet } from '@mercadopago/sdk-react';

const FinalizarContainer = styled.div<{theme: ThemeType}>`
`;

const WalletContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .sizing{
        position: relative;
        width: 500px;
        max-width: 95%;
    }
`;

const WalletAbsolute = styled.div<{theme: ThemeType}>`
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 82px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    border-radius: 10px;
    color: ${({theme}) => theme.colors.white};
    .wrapper{
        width: 100%;
        height: 100%;
        background-color: ${({theme}) => theme.colors.white};
        .button{
            background-color: ${({theme}) => theme.colors.main};
            border-radius: 10px;
            .finalizar{
                font-size: 18px;
                font-weight: bold;
            }
            p{
                margin: 0;
            }
        }
    }
`;


export { 
    FinalizarContainer,
    WalletContainer,
    WalletAbsolute,
};