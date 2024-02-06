
import { Routes, Route,  useNavigate } from 'react-router-dom';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import {  useState } from 'react';
import Home from './pages/Home/Home';
import GlobalStyles from './app_styles';
import { useTheme } from './contexts/Theme/ThemeContext';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Conta from './pages/Conta/Conta';
import Cadastro from './pages/Cadastro/Cadastro';


function App() {

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const { theme } = useTheme()


  return (
    <div className="App">
      <GlobalStyles theme={theme} />
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path='/conta' element={
          <RequireAuth>
            <Conta />
          </RequireAuth>
        } />
        <Route path='/cadastro' element={
          <Cadastro />
        } />
      </Routes>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          <BottomNavigationAction label="Início" icon={<HomeIcon />} value={"/"} />
          <BottomNavigationAction label="Conta" icon={<AccountCircleIcon />} value={"/conta"} />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default App;
