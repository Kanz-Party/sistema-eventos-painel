import styled from 'styled-components';
import { ThemeType } from '../../types/Theme';

const FinalizarContainer = styled.div<{theme: ThemeType}>`
`;

const WalletContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
`;

const WalletAbsolute = styled.div`
    position: absolute;
    top: 0;
    width: 280px;
    z-index: 10;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    border-radius: 10px;
    background-color: #f4f4f4;
`;


export { 
    FinalizarContainer,
    WalletContainer,
    WalletAbsolute
};