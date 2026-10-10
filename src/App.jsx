import { HashRouter, Navigate, Route, Routes } from 'react-router';
import { AuthProvider } from './auth/AuthContext.jsx';
import RutaProtegida from './auth/RutaProtegida.jsx';
import { I18nProvider } from './i18n/I18nContext.jsx';
import { TemaProvider } from './tema/TemaContext.jsx';
import Login from './paginas/Login.jsx';
import Home from './paginas/Home.jsx';
import Pasos from './paginas/Pasos.jsx';
import Comandos from './paginas/Comandos.jsx';
import Reglas from './paginas/Reglas.jsx';
import Consejos from './paginas/Consejos.jsx';
import Standard from './paginas/Standard.jsx';

const PAGINAS = [
  { ruta: '/', elemento: <Home /> },
  { ruta: '/pasos', elemento: <Pasos /> },
  { ruta: '/comandos', elemento: <Comandos /> },
  { ruta: '/reglas', elemento: <Reglas /> },
  { ruta: '/consejos', elemento: <Consejos /> },
  { ruta: '/standard', elemento: <Standard /> }
];

export default function App() {
  return (
    <TemaProvider>
      <I18nProvider>
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              {PAGINAS.map(({ ruta, elemento }) => (
                <Route key={ruta} path={ruta} element={<RutaProtegida>{elemento}</RutaProtegida>} />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </HashRouter>
      </I18nProvider>
    </TemaProvider>
  );
}
