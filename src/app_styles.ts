import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./types/Theme";

const GlobalStyles = createGlobalStyle<{theme: ThemeType}>`

    .App {
        font-family: 'D-DIN';
        text-align: center;
        width: 100%;
    }

    .hideMobile { @media (max-width: 1024px) { display: none !important; } }
    .hideDesktop { @media (min-width: 1025px) { display: none !important; } }

    html,
    body {
        scroll-behavior: smooth;
    }
`;

export default GlobalStyles;
