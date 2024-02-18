import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./types/Theme";

const GlobalStyles = createGlobalStyle<{theme: ThemeType}>`
    .App {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'OpenSans';
        text-align: center;
        width: 100%;
    }

    main {
        flex: 1;
    }

    .hideMobile { @media (max-width: 1024px) { display: none !important; } }
    .hideDesktop { @media (min-width: 1025px) { display: none !important; } }

    html,
    body {
        font-family: 'OpenSans';
        scroll-behavior: smooth;
    }
`;

export default GlobalStyles;
