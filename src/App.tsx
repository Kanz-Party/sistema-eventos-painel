
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { useState } from 'react';
import Home from './pages/Home/Home';
import GlobalStyles from './app_styles';
import { useTheme } from './contexts/Theme/ThemeContext';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Conta from './pages/Conta/Conta';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import Finalizar from './pages/Finalizar/Finalizar';
import { Header } from './components/Header/Header';
import ListagemIngressos from './pages/Ingressos/Ingressos';
import Cadastro from './pages/Cadastro/Cadastro';
import Footer from './components/Footer/Footer';
import Leitor from './pages/Leitor/Leitor';
import Ingresso from './pages/Ingresso/Ingresso';


function App() {

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const { theme } = useTheme()


  return (
    <div className="App">
      <GlobalStyles theme={theme} />
      <div className="main-container">
        <div className="header-and-routes">
          <Header />
          <Routes>
            <Route path="/" element={
              <Home />
            } />
            <Route path='/conta' element={
              <RequireAuth>
                <Conta />
              </RequireAuth>
            } />
            <Route path='/ingressos' element={
              <RequireAuth>
                <ListagemIngressos />
              </RequireAuth>
            } />
            {
              <Route path='/ingresso/:carrinho_hash' element={
                <Ingresso />
              } />
            }
            <Route path='/finalizar/:carrinho_hash' element={
              <Finalizar />
            } />
            <Route path='/cadastro' element={
              <Cadastro />
            } />
            <Route path='/leitor' element={
              <Leitor />
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
