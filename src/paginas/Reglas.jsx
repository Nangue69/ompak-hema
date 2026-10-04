import { useState } from 'react';
import Cabecera from '../componentes/Cabecera.jsx';
import PiePagina from '../componentes/PiePagina.jsx';
import { textos } from '../datos/contenido.js';
import { useI18n } from '../i18n/I18nContext.jsx';

const BLOQUES = ['casa', 'ompak'];

export default function Reglas() {
  const { idioma, t } = useI18n();
  const [bloque, setBloque] = useState('casa');

  const reglas = textos(idioma).reglas[bloque];

  return (
    <>
      <Cabecera titulo={t('reglas.titulo')} />

      <main className="contenedor pagina">
        <h1>{t('reglas.titulo')}</h1>
        <p className="subtitulo">{t('reglas.intro')}</p>

        <div className="pestanas" role="tablist">
          {BLOQUES.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              className="pestanas__boton"
              aria-selected={bloque === id}
              onClick={() => setBloque(id)}
            >
              {t(`reglas.${id}`)}
            </button>
          ))}
        </div>

        <ul className="lista-reglas">
          {reglas.map(({ tipo, titulo, texto }) => (
            <li className={`regla ${tipo === 'prohibido' ? 'regla--prohibido' : ''}`} key={titulo}>
              <span className="regla__icono" aria-hidden="true">
                {tipo === 'prohibido' ? '⛔' : '✅'}
              </span>
              <div>
                <h3>{titulo}</h3>
                <p className="regla__texto">{texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <PiePagina />
      </main>
    </>
  );
}
