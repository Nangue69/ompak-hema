import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthContext.jsx';

export default function RutaProtegida({ children }) {
  const { autenticado } = useAuth();
  const ubicacion = useLocation();

  if (!autenticado) return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace />;

  return children;
}
