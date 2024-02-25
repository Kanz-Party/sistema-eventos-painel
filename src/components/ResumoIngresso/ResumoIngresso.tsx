import React from 'react';
import './styles';
import { ResumoIngressoContainer } from './styles';
import { useTheme } from '../../contexts/Theme/ThemeContext';
import { ResumoIngressoLeitor } from '../../types/Ingresso';

interface ResumoIngressoProps {
    ingresso: ResumoIngressoLeitor;
}

const ResumoIngresso: React.FC<ResumoIngressoProps> = ({
    ingresso
}) => {

   const {theme} = useTheme();

    return (
        <ResumoIngressoContainer theme={theme}>
            <div className="resumo-ingresso">
                <div className="resumo-ingresso-header">
                    <h2>Resumo do Ingresso</h2>
                </div>
                <div className="resumo-ingresso-content">
                    <div className="resumo-ingresso-item">
                        <span>Nome:</span>
                        <p>{ingresso.usuario_nome}</p>
                    </div>
                    <div className="resumo-ingresso-item">
                        <span>Email:</span>
                        <p>{ingresso.usuario_email}</p>
                    </div>
                    <div className="resumo-ingresso-item bold">
                        <span>Ingresso:</span>
                        <p>{ingresso.ingresso_descricao} - {ingresso.lote_descricao}</p>
                    </div>
                    <div className="resumo-ingresso-item">
                        <span>Preço:</span>
                        <p>{ingresso.lote_preco}</p>
                    </div>
                </div>
            </div>

        </ResumoIngressoContainer >
    )
}

export default ResumoIngresso;