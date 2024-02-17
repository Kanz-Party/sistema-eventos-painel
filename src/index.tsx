import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { ThemeProvider } from './contexts/Theme/ThemeContext';
import GlobalFonts from './app_fonts';
import { CssBaseline } from '@mui/material';
import { CarrinhoProvider } from './contexts/Carrinho/CarrinhoProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <BrowserRouter>
      <AuthProvider>
        <CarrinhoProvider>
          <ThemeProvider>
            <CssBaseline />
            <GlobalFonts />
            <App />
          </ThemeProvider>
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
