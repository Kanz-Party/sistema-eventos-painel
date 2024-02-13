import React from "react";
import Logo from '../../assets/images/logo.png';
import styled from "styled-components";
import Sidebar from '../../components/Sidebar/Sidebar';
import { ThemeType } from "../../types/Theme";
import { Link } from "react-router-dom";

const HeaderStyle = styled.div<{ theme: ThemeType }>`
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

export const Header: React.FC = () => {
    return (
        <HeaderStyle>
            <div></div> {/* Espaço vazio para manter o logo centralizado */}
            <div className="logo">
                <Link to="/">
                    <LogoStyle src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="login-button">
                <Sidebar />
            </div>
        </HeaderStyle>
    );
};