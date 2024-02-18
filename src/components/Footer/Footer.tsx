import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Logo from '../../assets/images/logo.png';
import { FooterContainer, LogoStyles, SocialMediaContainer, FooterText, Container, Medias } from './styles';
import { Center } from '../../pages/Ingressos/styles';
import { Link } from 'react-router-dom';



const Footer = () => {
    return (
        <FooterContainer>
            <Center>
                <Container>
                    <LogoStyles src={Logo} alt="Logo" />
                    <Medias>
                        <SocialMediaContainer>
                            <InstagramIcon />
                            <a target='_blank' href="
                            https://www.instagram.com/kanzparty/
                            ">
                                <FooterText>@kanzparty</FooterText>
                            </a>
                        </SocialMediaContainer>
                        <FooterText>
                            <a target='_blank' href=" 
                            https://api.whatsapp.com/send?phone=54991087895&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20ingressos%20do%20Kanz%20Party%20">
                                <WhatsAppIcon /> Felipe
                            </a>
                        </FooterText>
                        <FooterText>
                            <a target='_blank' href="
                            https://api.whatsapp.com/send?phone=5499377877&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20ingressos%20do%20Kanz%20Party%20">
                                <WhatsAppIcon /> Victor
                            </a>
                        </FooterText>
                        <FooterText>
                            <a target='_blank' href="
                            https://api.whatsapp.com/send?phone=54991641260&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20ingressos%20do%20Kanz%20Party%20">
                                <WhatsAppIcon /> Abdallah
                            </a>
                        </FooterText>
                    </Medias>
                </Container>
            </Center>
        </FooterContainer>
    );
};

export default Footer;
