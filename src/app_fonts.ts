import { createGlobalStyle } from "styled-components";
import DDIN from "../src/fonts/DDIN/D-DIN.ttf";
import DDINBold from "../src/fonts/DDIN/D-DIN-Bold.ttf";
import Bassunpersonaluse from "../src/fonts/Bassunpersonaluse.otf";
import Shaumy from "../src/fonts/Shaumy.otf";
import OpenSans from "../src/fonts/OpenSans.ttf";

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

    @font-face {
        font-family: 'Bassunpersonaluse';
        font-style: normal;
        font-weight: 400;
        src: local('Bassunpersonaluse'), local('Bassunpersonaluse'), url(${Bassunpersonaluse}) format('opentype');
    }

    @font-face {
        font-family: 'Shaumy';
        font-style: normal;
        font-weight: 400;
        src: local('Shaumy'), local('Shaumy'), url(${Shaumy}) format('opentype');
    }

    @font-face {
        font-family: 'OpenSans';
        font-style: normal;
        font-weight: 400;
        src: local('OpenSans'), local('OpenSans'), url(${OpenSans}) format('truetype');
    }

`;

export default GlobalFonts;
