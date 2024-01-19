import { createGlobalStyle } from "styled-components";
import DDIN from "../src/fonts/DDIN/D-DIN.ttf";
import DDINBold from "../src/fonts/DDIN/D-DIN-Bold.ttf";

const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'D-DIN';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('DDIN'), local('DDIN'), url(${DDIN}) format('truetype');
    }

    @font-face {
        font-family: 'D-DIN-Bold';
        font-style: normal;
        font-weight: 700;
        src: local('DDIN'), local('DDIN'), url(${DDINBold}) format('truetype');
    }
`;

export default GlobalFonts;
