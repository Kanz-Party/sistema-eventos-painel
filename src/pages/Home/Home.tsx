import React, { useEffect } from 'react';
import './styles';
import { HomeContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import Typography from '@mui/material/Typography/Typography';
import { useIngressosApi } from '../../hooks/ingressosApi';


interface HomeProps {
}

const Home: React.FC<HomeProps> = ({}) => {

    const ingressosApi = useIngressosApi();

   const {theme} = useTheme();

    useEffect(() => {
        ingressosApi.getIngressos();
    }, []);

    return (
        <HomeContainer  theme={theme}>
            
        </HomeContainer >
    )
}

export default Home;