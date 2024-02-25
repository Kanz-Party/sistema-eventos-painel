import styled from 'styled-components';
import { ThemeType } from '../../types/Theme';

const ResumoIngressoContainer = styled.div<{theme: ThemeType}>`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    .resumo-ingresso{
        width: 100%;
        max-width: 300px;
        background-color: ${props => props.theme.colors.gray};
        border-radius: 5px;
        box-shadow: 0 0 5px 1px #00000020;
        .resumo-ingresso-header{
            width: 100%;
            padding: 10px;
            border-bottom: 1px solid #00000020;
            h2{
                font-size: 1.2rem;
                color: ${props => props.theme.colors.main};
            }
        }
        .resumo-ingresso-content{
            width: 100%;
            padding: 10px;
            .resumo-ingresso-item{
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                span{
                    font-size: 0.8rem;
                    color: ${props => props.theme.colors.main};
                }
                p{
                    font-size: 1rem;
                    color: ${props => props.theme.colors.main};
                }
            }
            .bold {
                p{
                    font-weight: bold;
                }
            }
        }
    }
`;

export { 
    ResumoIngressoContainer,
};