import styled from 'styled-components';
import { ThemeType } from '../../types/Theme';

const LeitorContainer = styled.div<{theme: ThemeType}>`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    .scanner-container{
        width: 100%;
    }
`;

export { 
    LeitorContainer,
};