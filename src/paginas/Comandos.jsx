import { useState } from 'react';
import Cabecera from '../componentes/Cabecera.jsx';
import PiePagina from '../componentes/PiePagina.jsx';
import PantallaSimulada from '../componentes/PantallaSimulada.jsx';
import { estructura, textos } from '../datos/contenido.js';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function Comandos() {
  const { idioma, t } = useI18n();
  const [abierta, setAbierta] = useState(null);

  const contenido = textos(idioma);

  return (
    <>
      <Cabecera titulo={t('comandos.titulo')} />

      <main className="contenedor pagina">
        <h1>{t('comandos.titulo')}</h1>
        <p className="subtitulo">{t('comandos.intro')}</p>

        <figure className="error-foto" style={{ marginBottom: '20px' }}>
          <img
            className="error-foto__img"
            src="./img/fotos/wms-pack-tote.webp"
            alt={t('comandos.pantalla_real')}
            loading="lazy"
          />
          <figcaption className="error-foto__pie">
            <p className="error-foto__texto">{t('comandos.pantalla_real')}</p>
          </figcaption>
        </figure>

        <div className="acordeon">
          {estructura.comandos.map(({ tecla, pantalla, fuente }) => {
            const texto = contenido.comandos[tecla];
            const activa = abierta === tecla;

            return (
              <div className="acordeon__item" key={tecla}>
                <h2>
                  <button
                    type="button"
                    className="acordeon__boton"
                    aria-expanded={activa}
                    onClick={() => setAbierta(activa ? null : tecla)}
                  >
                    <span className="tecla">{tecla}</span>
                    <span className="acordeon__titulo">{texto.titulo}</span>
                    <span className="acordeon__signo" aria-hidden="true">
                      {activa ? '−' : '+'}
                    </span>
                  </button>
                </h2>

                {activa && (
                  <div className="acordeon__cuerpo">
                    <span className="etiqueta-bloque">{t('comandos.que_hace')}</span>
                    <p>{texto.descripcion}</p>

                    {pantalla && (
                      <>
                        <span className="etiqueta-bloque">{t('comandos.en_pantalla')}</span>
                        <PantallaSimulada texto={pantalla} />
                      </>
                    )}

                    {fuente === 'borrador' && <p className="nota-revisar">{t('comun.revisar')}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 style={{ marginTop: '28px' }}>{t('comandos.glosario')}</h2>
        <dl className="consejos">
          {estructura.glosario.map(({ id, termino }) => (
            <div className="consejo" key={id}>
              <span className="consejo__icono" aria-hidden="true">
                📖
              </span>
              <div>
                <dt>
                  <strong>{termino}</strong>
                </dt>
                <dd style={{ margin: 0 }} className="tarjeta-menu__desc">
                  {contenido.glosario[id]}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <PiePagina />
      </main>
    </>
  );
}
