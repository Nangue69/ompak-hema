import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CLAVE = 'hema_tema';
const TemaContext = createContext(null);

function temaInicial() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === 'claro' || guardado === 'oscuro') return guardado;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(temaInicial);

  useEffect(() => {
    localStorage.setItem(CLAVE, tema);
    document.documentElement.dataset.tema = tema;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tema === 'oscuro' ? '#15171a' : '#E30613');
  }, [tema]);

  const valor = useMemo(
    () => ({ tema, alternar: () => setTema((actual) => (actual === 'claro' ? 'oscuro' : 'claro')) }),
    [tema]
  );

  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

export function useTema() {
  const contexto = useContext(TemaContext);
  if (!contexto) throw new Error('useTema debe usarse dentro de TemaProvider');
  return contexto;
}
