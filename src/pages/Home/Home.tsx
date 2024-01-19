import React from 'react';
import './styles';
import { HomeContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';


interface HomeProps {
}

const Home: React.FC<HomeProps> = ({}) => {

    

   const {theme} = useTheme();

    return (
        <HomeContainer  theme={theme}>
            home
        </HomeContainer >
    )
}

export default Home;