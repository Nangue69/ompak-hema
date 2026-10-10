import Cabecera from '../componentes/Cabecera.jsx';
import PiePagina from '../componentes/PiePagina.jsx';
import { estructura, textos } from '../datos/contenido.js';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function Pasos() {
  const { idioma, t } = useI18n();
  const contenido = textos(idioma).pasos;

  return (
    <>
      <Cabecera titulo={t('pasos.titulo')} />

      <main className="contenedor pagina">
        <h1>{t('pasos.titulo')}</h1>
        <p className="subtitulo">{t('pasos.intro')}</p>

        <ol className="pasos">
          {estructura.pasos.map(({ id, fotos, teclas }, indice) => (
            <li className="paso" key={id}>
              <div className="paso__cabeza">
                <span className="paso__numero" aria-hidden="true">
                  {indice + 1}
                </span>
                <h2>{contenido[id].titulo}</h2>
              </div>

              <p className="paso__texto">{contenido[id].texto}</p>

              {teclas && (
                <p className="paso__teclas">
                  {teclas.map((tecla) => (
                    <span className="tecla" key={tecla}>
                      {tecla}
                    </span>
                  ))}
                </p>
              )}

              {fotos.length > 0 && (
                <div className="paso__fotos">
                  {fotos.map((archivo) => (
                    <img
                      className="paso__foto"
                      key={archivo}
                      src={`./img/pasos/${archivo}`}
                      alt={contenido[id].titulo}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        <PiePagina />
      </main>
    </>
  );
}
