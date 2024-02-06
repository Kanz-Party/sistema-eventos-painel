import React from 'react';
import './styles';
import { ContaContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';



const Conta: React.FC = () => {

   const {theme} = useTheme();

    return (
        <ContaContainer  theme={theme}>
            <>Conta</>
        </ContaContainer >
    )
}

export default Conta;