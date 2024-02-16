
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RequireAuth } from './components/contexts/Auth/RequireAuth';
import { useState } from 'react';
import Home from './pages/Home/Home';
import GlobalStyles from './app_styles';
import { useTheme } from './components/contexts/Theme/ThemeContext';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Conta from './pages/Conta/Conta';
import { AuthProvider } from './components/contexts/Auth/AuthProvider';
import { CarrinhosProvider } from './components/contexts/Carrinhos/CarrinhosProvider';
import Finalizar from './pages/Finalizar/Finalizar';
import { Header } from './components/Header/Header';
import ListagemIngressos from './pages/Ingressos/Ingressos';


function App() {

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const { theme } = useTheme()


  return (
    <div className="App">
      <GlobalStyles theme={theme} />
      <Header />

      <Routes>
        <Route path="/" element={
          <CarrinhosProvider>
            <Home />
          </CarrinhosProvider>
        } />
        <Route path='/conta' element={
          <RequireAuth>
            <Conta />
          </RequireAuth>
        } />
        <Route path='/ingressos' element={
          <CarrinhosProvider>
            <ListagemIngressos />
          </CarrinhosProvider>
        } />
        <Route path='/finalizar' element={

          <CarrinhosProvider>
            <Finalizar />
          </CarrinhosProvider>

        } />
      </Routes>

    </div>
  );
}

export default App;
