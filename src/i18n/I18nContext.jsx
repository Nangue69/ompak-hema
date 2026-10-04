import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import es from './es.json';
import en from './en.json';
import nl from './nl.json';
import pl from './pl.json';

const TEXTOS = { es, en, nl, pl };

export const IDIOMAS = [
  { codigo: 'es', nombre: 'Español', bandera: '🇪🇸' },
  { codigo: 'en', nombre: 'English', bandera: '🇬🇧' },
  { codigo: 'nl', nombre: 'Nederlands', bandera: '🇳🇱' },
  { codigo: 'pl', nombre: 'Polski', bandera: '🇵🇱' }
];

const CLAVE = 'hema_idioma';
const I18nContext = createContext(null);

function idiomaInicial() {
  const guardado = localStorage.getItem(CLAVE);
  if (TEXTOS[guardado]) return guardado;

  const navegador = (navigator.language || 'es').slice(0, 2).toLowerCase();
  return TEXTOS[navegador] ? navegador : 'es';
}

function buscar(objeto, ruta) {
  return ruta.split('.').reduce((valor, parte) => (valor == null ? undefined : valor[parte]), objeto);
}

export function I18nProvider({ children }) {
  const [idioma, setIdioma] = useState(idiomaInicial);

  useEffect(() => {
    localStorage.setItem(CLAVE, idioma);
    document.documentElement.lang = idioma;
  }, [idioma]);

  const t = useCallback(
    (ruta, variables) => {
      const texto = buscar(TEXTOS[idioma], ruta) ?? buscar(TEXTOS.es, ruta) ?? ruta;
      if (!variables) return texto;
      return Object.entries(variables).reduce((acc, [clave, valor]) => acc.replaceAll(`{${clave}}`, valor), texto);
    },
    [idioma]
  );

  const valor = useMemo(() => ({ idioma, setIdioma, t }), [idioma, t]);

  return <I18nContext.Provider value={valor}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const contexto = useContext(I18nContext);
  if (!contexto) throw new Error('useI18n debe usarse dentro de I18nProvider');
  return contexto;
}
