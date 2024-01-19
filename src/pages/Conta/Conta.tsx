import React from 'react';
import './styles';
import { ContaContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';

interface ContaProps {
}

const Conta: React.FC<ContaProps> = ({}) => {

   const {theme} = useTheme();

    return (
        <ContaContainer  theme={theme}>
            
        </ContaContainer >
    )
}

export default Conta;