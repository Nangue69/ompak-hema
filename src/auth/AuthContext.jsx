import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { sha256 } from 'js-sha256';
import usuarios from './usuarios.json';
import { diasRestantes, estadoClave } from './validez.js';

const CLAVE_REGISTRO = 'hema_keys';
const CLAVE_SESION = 'hema_sesion';

const AuthContext = createContext(null);

function leerRegistro() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_REGISTRO)) || {};
  } catch {
    return {};
  }
}

function guardarRegistro(registro) {
  localStorage.setItem(CLAVE_REGISTRO, JSON.stringify(registro));
}

function calcularHash(usuario, password) {
  return sha256(`${usuario}:${password}`);
}

function esPermanente(usuario) {
  return usuarios.some((registro) => registro.usuario === usuario && registro.permanente);
}

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => localStorage.getItem(CLAVE_SESION));

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
  }, []);

  const revisarVigencia = useCallback(() => {
    const actual = localStorage.getItem(CLAVE_SESION);
    if (!actual || esPermanente(actual)) return;
    if (estadoClave(leerRegistro()[actual]) !== 'activa') cerrarSesion();
  }, [cerrarSesion]);

  useEffect(() => {
    revisarVigencia();
    document.addEventListener('visibilitychange', revisarVigencia);
    return () => document.removeEventListener('visibilitychange', revisarVigencia);
  }, [revisarVigencia]);

  const entrar = useCallback((usuarioEscrito, password) => {
    const usuario = usuarioEscrito.trim().toLowerCase();
    const hash = calcularHash(usuario, password);
    const encontrado = usuarios.find((registro) => registro.usuario === usuario && registro.hash === hash);

    if (!encontrado) return { ok: false, motivo: 'credenciales' };

    if (encontrado.permanente) {
      localStorage.setItem(CLAVE_SESION, usuario);
      setSesion(usuario);
      return { ok: true, permanente: true };
    }

    const registro = leerRegistro();
    const estado = estadoClave(registro[usuario]);

    if (estado === 'caducada') return { ok: false, motivo: 'caducada' };

    if (estado === 'sin_usar') {
      registro[usuario] = new Date().toISOString();
      guardarRegistro(registro);
    }

    localStorage.setItem(CLAVE_SESION, usuario);
    setSesion(usuario);

    return { ok: true, diasRestantes: diasRestantes(registro[usuario]) };
  }, []);

  const valor = useMemo(
    () => ({
      usuario: sesion,
      autenticado: Boolean(sesion),
      permanente: Boolean(sesion) && esPermanente(sesion),
      diasRestantes: sesion ? diasRestantes(leerRegistro()[sesion]) : 0,
      entrar,
      cerrarSesion
    }),
    [sesion, entrar, cerrarSesion]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
}
